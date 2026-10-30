/**
 * Opt-in development clock for testing date changes without changing the device.
 * This tool is not wired into the app. To use it temporarily:
 *
 * 1. Import from '@/utils/dev-tools/clock'. Call installDevClock() once in a
 *    development entry point, guarded with if (__DEV__).
 * 2. Use getClockNow() wherever the feature reads the current time. This does
 *    not override new Date(), Date.now(), or third-party libraries' clocks.
 * 3. For mounted date-dependent UI, subscribeClockChange(refresh) should refresh
 *    state AND reschedule any midnight timer using getClockNow(). Call the
 *    returned unsubscribe function on unmount. Keep foreground refresh too.
 * 4. In Expo Go, press j in the Expo terminal and open the DevTools Console:
 *      __testClock.set('2026-10-31T23:59:30') // local time; keeps ticking
 *      __testClock.now()                     // inspect simulated time
 *      __testClock.reset()                   // restore real time
 *
 * Sample setup in src/app/_layout.tsx:
 *
 *   import { installDevClock } from '@/utils/dev-tools/clock';
 *   if (__DEV__) installDevClock();
 *
 * Sample replacement for watchLocalDate in hooks/use-today.ts. Keep that file's
 * existing localDateKey helper and React/React Native imports:
 *
 *   import { getClockNow, subscribeClockChange } from '@/utils/dev-tools/clock';
 *
 *   export function watchLocalDate(onChange: (today: string) => void) {
 *     let timer: ReturnType<typeof setTimeout>;
 *     const refresh = () => {
 *       clearTimeout(timer);
 *       const now = getClockNow();
 *       onChange(localDateKey(now));
 *       const midnight = new Date(now);
 *       midnight.setHours(24, 0, 0, 0);
 *       timer = setTimeout(refresh, Math.max(1, midnight.getTime() - now.getTime()));
 *     };
 *     const appState = AppState.addEventListener('change', (state) => {
 *       if (state === 'active') refresh();
 *     });
 *     const unsubscribe = subscribeClockChange(refresh);
 *     refresh();
 *     return () => {
 *       clearTimeout(timer);
 *       appState.remove();
 *       unsubscribe();
 *     };
 *   }
 *
 * Also initialize useToday's state from the same clock:
 *   const [today, setToday] = useState(() => localDateKey(getClockNow()));
 *
 * Other current-time reads (e.g. the period selector's future-date guard):
 *   const today = toLocalDateKey(getClockNow()); // existing local date helper
 *
 * To handle third-party calendars, derive the Today highlight from this same
 * date instead of the library's device-clock-based "today" state.
 *
 * An explicit Z/UTC offset in the input specifies an instant; it does not mock
 * the device timezone. The offset is never persisted and is ignored in release
 * builds. Remove the temporary wiring when finished testing.
 */
let offset: number | null = null;
const listeners = new Set<() => void>();

export function getClockNow(): Date {
  return new Date(Date.now() + (__DEV__ ? offset ?? 0 : 0));
}

export function isDevClockSet(): boolean {
  return __DEV__ && offset !== null;
}

/** The simulated clock continues ticking. Pass null to restore real time. */
export function setDevClock(date: Date | null): void {
  if (!__DEV__) return;
  if (date && !Number.isFinite(date.getTime())) throw new RangeError('Invalid test date');
  offset = date ? date.getTime() - Date.now() : null;
  listeners.forEach((listener) => listener());
}

export function subscribeClockChange(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

type TestClock = {
  now: () => Date;
  set: (date: Date | string) => void;
  reset: () => void;
};

declare global {
  // Accessible from React Native DevTools; absent in release builds.
  var __testClock: TestClock | undefined;
}

export function installDevClock(): void {
  if (!__DEV__) return;
  globalThis.__testClock = {
    now: getClockNow,
    set: (date) => setDevClock(typeof date === 'string' ? new Date(date) : date),
    reset: () => setDevClock(null),
  };
}
