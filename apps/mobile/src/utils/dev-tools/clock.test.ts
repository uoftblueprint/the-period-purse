import { getClockNow, installDevClock, isDevClockSet, setDevClock, subscribeClockChange } from './clock';

describe('development clock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 30, 12));
  });

  afterEach(() => {
    setDevClock(null);
    globalThis.__testClock = undefined;
    jest.useRealTimers();
  });

  it('ticks from a simulated time without changing the system clock', () => {
    const realTime = Date.now();
    const simulated = new Date(2026, 9, 31, 23, 59, 45);
    setDevClock(simulated);
    expect(getClockNow().getTime()).toBe(simulated.getTime());
    expect(Date.now()).toBe(realTime);
    jest.advanceTimersByTime(15_000);
    expect(getClockNow()).toEqual(new Date(2026, 10, 1));
    expect(isDevClockSet()).toBe(true);
  });

  it('notifies subscribers on clock changes and restores real time', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeClockChange(listener);
    setDevClock(new Date(2027, 0, 1));
    setDevClock(null);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(getClockNow().getTime()).toBe(Date.now());
    expect(isDevClockSet()).toBe(false);
    unsubscribe();
    setDevClock(new Date(2027, 0, 1));
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('exposes a console control that sets a local date and resets the clock', () => {
    installDevClock();
    const clock = globalThis.__testClock!;
    clock.set('2026-10-31T23:59:45');
    expect(clock.now()).toEqual(new Date(2026, 9, 31, 23, 59, 45));
    clock.reset();
    expect(clock.now().getTime()).toBe(Date.now());
  });
});
