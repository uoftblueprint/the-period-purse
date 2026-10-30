import { AppState, type AppStateStatus } from 'react-native';

import { watchLocalDate } from './use-today';

describe('local date refresh', () => {
  let onAppStateChange: (state: AppStateStatus) => void;
  const remove = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 31, 23, 59, 59));
    jest.spyOn(AppState, 'addEventListener').mockImplementation((_event, listener) => {
      onAppStateChange = listener;
      return { remove };
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
    remove.mockClear();
  });

  it('refreshes across month rollover and schedules subsequent midnights', () => {
    const onChange = jest.fn();
    const stop = watchLocalDate(onChange);
    expect(onChange).toHaveBeenLastCalledWith('2026-10-31');
    jest.advanceTimersByTime(1000);
    expect(onChange).toHaveBeenLastCalledWith('2026-11-01');
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    jest.advanceTimersByTime(midnight.getTime() - now.getTime());
    expect(onChange).toHaveBeenLastCalledWith('2026-11-02');
    stop();
  });

  it('refreshes immediately on foreground after a long suspension without duplicating timers', () => {
    const onChange = jest.fn();
    const stop = watchLocalDate(onChange);
    jest.setSystemTime(new Date(2027, 2, 4, 10));
    onAppStateChange('active');
    expect(onChange).toHaveBeenLastCalledWith('2027-03-04');
    onAppStateChange('active');
    expect(jest.getTimerCount()).toBe(1);
    stop();
    expect(remove).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

});
