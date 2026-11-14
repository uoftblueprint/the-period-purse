import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared loading and saving state for the symptom and period-date forms.
 * Callers supply local storage functions; these hooks make no network requests.
 */

// --- Load saved logs: loading state, errors, retry and stale-result protection ---
/** Keep `load` stable with useCallback; change it when the selected date changes. */
export function useLogLoad<T>(load: () => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{ loader: typeof load; data?: T; loading: boolean; error: boolean }>({
    loader: load, loading: true, error: false,
  });
  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  // Load on mount, date change or retry. Ignore results after cleanup.
  useEffect(() => {
    let active = true;
    setState({ loader: load, loading: true, error: false });
    Promise.resolve().then(load).then(
      (data) => { if (active) setState({ loader: load, data, loading: false, error: false }); },
      () => { if (active) setState({ loader: load, loading: false, error: true }); },
    );
    return () => { active = false; };
  }, [load, attempt]);

  // Hide the previous date's data immediately, before the new effect runs.
  const current = state.loader === load;
  return { data: current ? state.data : undefined, loading: !current || state.loading, error: current && state.error, reload };
}

// --- Save log edits: saving state, errors and duplicate-submit protection ---
/** `submit` returns true only when saving succeeds and the form is still mounted. */
export function useLogSubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  // Refs update immediately, covering repeated presses before React renders.
  const pending = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Report failures without closing the form, so its draft can be retried.
  const submit = useCallback(async (save: () => Promise<void>) => {
    if (pending.current || !mounted.current) return false;
    pending.current = true;
    setSubmitting(true);
    setError(false);
    try {
      await save();
      return mounted.current;
    } catch {
      if (mounted.current) setError(true);
      return false;
    } finally {
      pending.current = false;
      if (mounted.current) setSubmitting(false);
    }
  }, []);

  return { submitting, error, submit };
}
