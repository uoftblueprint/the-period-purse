import { createDiscardConfirmation } from './discard-confirmation';

describe('discard confirmation', () => {
  it('treats native Modal Back as Keep editing while a date change is pending', () => {
    let visible = false;
    let date = '2026-10-29';
    let closed = false;
    const confirmation = createDiscardConfirmation((value) => { visible = value; });

    confirmation.requestAction(() => { date = '2026-10-28'; }, true);
    expect(visible).toBe(true);
    confirmation.requestClose(() => { closed = true; }, true);

    expect(visible).toBe(false);
    expect(date).toBe('2026-10-29');
    expect(closed).toBe(false);
    confirmation.discard();
    expect(date).toBe('2026-10-29');
    expect(closed).toBe(false);

    // A subsequent deliberate close can ask again and discard closes the form.
    confirmation.requestClose(() => { closed = true; }, true);
    expect(visible).toBe(true);
    confirmation.discard();
    expect(visible).toBe(false);
    expect(closed).toBe(true);
  });

  it('preserves the first pending action when another action is requested', () => {
    let date = '2026-10-29';
    const confirmation = createDiscardConfirmation(() => {});
    confirmation.requestAction(() => { date = '2026-10-28'; }, true);
    confirmation.requestAction(() => { date = '2026-10-27'; }, true);
    confirmation.discard();
    expect(date).toBe('2026-10-28');
  });

  it('clears the pending action when the dialog is dismissed or Keep editing is chosen', () => {
    let executions = 0;
    let visible = false;
    const confirmation = createDiscardConfirmation((value) => { visible = value; });
    confirmation.requestAction(() => { executions += 1; }, true);
    confirmation.keepEditing();
    confirmation.discard();
    expect(visible).toBe(false);
    expect(executions).toBe(0);
  });

  it('runs a confirmed action exactly once and allows its next request', () => {
    let executions = 0;
    let visible = false;
    const confirmation = createDiscardConfirmation((value) => { visible = value; });
    confirmation.requestAction(() => { executions += 1; }, true);
    confirmation.discard();
    confirmation.discard();
    expect(visible).toBe(false);
    expect(executions).toBe(1);
    confirmation.requestAction(() => { executions += 1; }, true);
    expect(visible).toBe(true);
    confirmation.discard();
    expect(executions).toBe(2);
  });

  it('settles the old confirmation before running its callback', () => {
    let visible = false;
    let executions = 0;
    const confirmation = createDiscardConfirmation((value) => { visible = value; });
    confirmation.requestAction(() => {
      expect(visible).toBe(false);
      confirmation.requestAction(() => { executions += 1; }, true);
    }, true);
    confirmation.discard();
    expect(visible).toBe(true);
    confirmation.discard();
    expect(executions).toBe(1);
    expect(visible).toBe(false);
  });

  it('performs actions immediately when the draft has no changes', () => {
    let executions = 0;
    let visible = false;
    const confirmation = createDiscardConfirmation((value) => { visible = value; });
    confirmation.requestAction(() => { executions += 1; }, false);
    confirmation.requestClose(() => { executions += 1; }, false);
    expect(executions).toBe(2);
    expect(visible).toBe(false);
  });
});
