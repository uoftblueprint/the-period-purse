import type { ReactNode } from 'react';

// Install the DOM after Expo's native setup, which owns the initial window global.
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', { url: 'http://localhost' });
Object.defineProperties(globalThis, {
  window: { configurable: true, value: dom.window },
  document: { configurable: true, value: dom.window.document },
  navigator: { configurable: true, value: dom.window.navigator },
  ShadowRoot: { configurable: true, value: dom.window.ShadowRoot },
  HTMLElement: { configurable: true, value: dom.window.HTMLElement },
});
const { act } = require('react') as typeof import('react');
const { MonthCalendar } = require('./month-calendar') as typeof import('./month-calendar');
const { AppState } = require('react-native') as typeof import('react-native');
const todayHook = require('@/hooks/use-today') as typeof import('@/hooks/use-today');
const mockScrollToOffset = jest.fn();
let mockFlatListProps: any;

// Exercise the actual CalendarList and Calendar rows. Only adapt the native
// rendering boundary for the DOM; preserve FlatList's supplied row keys.
jest.mock('react-native', () => {
  const React = require('react');
  const native = jest.requireActual('react-native-web');
  return {
    ...native,
    AppState: { addEventListener: jest.fn(() => ({ remove: jest.fn() })) },
    View: React.forwardRef(({ onLayout, children, ...props }: any, ref: any) => {
      React.useLayoutEffect(() => {
        onLayout?.({ nativeEvent: { layout: { width: 400, height: 800 } } });
      }, [onLayout]);
      return React.createElement(native.View, { ...props, ref }, children);
    }),
    FlatList: React.forwardRef((props: any, ref: any) => {
      const { data, renderItem, keyExtractor } = props;
      mockFlatListProps = props;
      React.useImperativeHandle(ref, () => ({ scrollToOffset: mockScrollToOffset }));
      return React.createElement('div', null, data.map((item: any, index: number) =>
        React.createElement(React.Fragment, { key: keyExtractor(item, index) }, renderItem({ item, index })),
      ));
    }),
  };
});

jest.mock('react-native-paper', () => ({
  Button: ({ children, onPress }: any) => require('react').createElement('button', { onClick: onPress }, children),
}));

const { createRoot } = require('react-dom/client') as {
  createRoot: (container: Element) => { render: (node: ReactNode) => void; unmount: () => void };
};

describe('calendar month rollover with a fixed opening date', () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 31, 23, 59, 59));
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
    jest.useRealTimers();
    delete (globalThis as any).IS_REACT_ACT_ENVIRONMENT;
  });

  afterAll(() => dom.window.close());

  it('keeps the rendered month aligned with its row after midnight', () => {
    act(() => root.render(<MonthCalendar initialDate="2026-10-31" onDayPress={() => {}} />));
    const novemberRow = () => container.querySelector('[data-testid="undefined.item_2026-11"]');
    expect(novemberRow()?.textContent).toContain('November 2026');

    act(() => jest.advanceTimersByTime(1000));

    expect(novemberRow()?.textContent).toContain('November 2026');
  });

  it.each([undefined, '2026-10-31'])('preserves the viewport at rollover with initialDate=%s', (initialDate) => {
    act(() => root.render(<MonthCalendar initialDate={initialDate} onDayPress={() => {}} />));
    const novemberRow = container.querySelector('[data-testid="undefined.item_2026-11"]');
    // The viewport is 150px into November, 13 months after the old first row.
    act(() => mockFlatListProps.onMomentumScrollEnd?.({
      nativeEvent: { contentOffset: { x: 0, y: 13 * 420 + 150 } },
    }));
    mockScrollToOffset.mockClear();

    act(() => jest.advanceTimersByTime(1000));

    expect(container.querySelector('[data-testid="undefined.item_2026-11"]')).toBe(novemberRow);
    // The first row advanced one month, so subtract one month's height.
    expect(mockScrollToOffset).toHaveBeenLastCalledWith({ offset: 12 * 420 + 150, animated: false });

    const todayButton = Array.from(container.querySelectorAll('button'))
      .find((button) => button.textContent === 'Today')!;
    act(() => todayButton.click());
    expect(mockScrollToOffset).toHaveBeenLastCalledWith({ offset: 12 * 420, animated: true });
  });

  it('realigns rows after returning to the app several months later', () => {
    act(() => root.render(<MonthCalendar initialDate="2026-10-31" onDayPress={() => {}} />));
    jest.setSystemTime(new Date(2027, 0, 1, 10));
    const appStateListener = jest.mocked(AppState.addEventListener).mock.calls.at(-1)![1];

    act(() => appStateListener('active'));

    const januaryRow = container.querySelector('[data-testid="undefined.item_2027-01"]');
    expect(januaryRow?.textContent).toContain('January 2027');
  });

  it('moves the Today outline with the app clock while preserving the tapped selection', () => {
    jest.setSystemTime(new Date(2026, 9, 30, 12));
    const today = jest.spyOn(todayHook, 'useToday').mockReturnValue('2026-10-30');
    const render = () => root.render(
      <MonthCalendar initialDate="2026-10-15" selectedDate="2026-10-23" onDayPress={() => {}} />,
    );
    const borderWidth = (day: number) => {
      const label = new Date(2026, 9, day).toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric',
      });
      const cell = Array.from(container.querySelectorAll('[role="button"]'))
        .find((element) => element.getAttribute('aria-label') === label);
      expect(cell).toBeDefined();
      return dom.window.getComputedStyle(cell).borderTopWidth;
    };
    act(render);
    expect(borderWidth(30)).toBe('1px');
    expect(borderWidth(23)).toBe('2px');

    // App/injected time advances, but the library still sees October 30.
    today.mockReturnValue('2026-10-31');
    act(render);

    expect(borderWidth(31)).toBe('1px');
    expect(borderWidth(30)).not.toBe('1px');
    expect(borderWidth(23)).toBe('2px');
  });

  it('keeps existing day cells mounted when the selected date changes', () => {
    const onDayPress = jest.fn();
    act(() => root.render(
      <MonthCalendar initialDate="2026-10-15" selectedDate="2026-10-23" onDayPress={onDayPress} />,
    ));
    const label = new Date(2026, 9, 15).toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric',
    });
    const cell = () => Array.from(container.querySelectorAll('[role="button"]'))
      .find((element) => element.getAttribute('aria-label') === label);
    const before = cell();
    expect(before).toBeDefined();

    act(() => root.render(
      <MonthCalendar initialDate="2026-10-15" selectedDate="2026-10-24" onDayPress={onDayPress} />,
    ));

    expect(cell()).toBe(before);
  });
});
