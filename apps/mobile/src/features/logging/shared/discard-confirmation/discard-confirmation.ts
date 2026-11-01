/** Owns the pending navigation action for a controlled discard dialog. */
export function createDiscardConfirmation(setVisible: (visible: boolean) => void) {
  let pendingAction: (() => void) | null = null;

  function requestAction(action: () => void, dirty: boolean) {
    if (pendingAction) return;
    if (!dirty) return action();
    pendingAction = action;
    setVisible(true);
  }

  function keepEditing() {
    pendingAction = null;
    setVisible(false);
  }

  function discard() {
    const action = pendingAction;
    keepEditing();
    action?.();
  }

  function requestClose(action: () => void, dirty: boolean) {
    // React Native's enclosing Modal receives Android Back instead of Paper's
    // dialog BackHandler. Give the visible confirmation the first dismissal.
    if (pendingAction) return keepEditing();
    requestAction(action, dirty);
  }

  return { requestAction, requestClose, keepEditing, discard };
}
