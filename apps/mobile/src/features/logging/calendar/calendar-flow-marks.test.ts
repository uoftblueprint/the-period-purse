import { getCalendarFlowMarks } from './calendar-flow-marks';

describe('getCalendarFlowMarks', () => {
  it('shows the stored flow levels without creating marks for empty or None days', () => {
    const days = [
      { date: '2026-10-01', flow: 'Light' as const },
      { date: '2026-10-02', flow: 'Medium' as const },
      { date: '2026-10-03', flow: 'Heavy' as const },
      { date: '2026-10-04', flow: 'Spotting' as const },
      { date: '2026-10-05', flow: 'None' as const },
      { date: '2026-10-06', flow: null },
      { date: '2026-10-07' },
    ];
    const before = JSON.stringify(days);
    const marks = getCalendarFlowMarks(days);

    expect(Object.keys(marks)).toEqual(['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04']);
    const shades = Object.values(marks).map((mark) => mark.selectedColor);
    expect(new Set(shades).size).toBe(4);
    for (const mark of Object.values(marks)) {
      expect(mark.selected).toBe(true);
      const channels = mark.selectedColor.slice(1).match(/../g);
      expect(channels).toHaveLength(3);
      expect(new Set(channels).size).toBe(1);
    }
    expect(JSON.stringify(days)).toBe(before);
  });

  it('leaves a new calendar empty instead of supplying demonstration flow records', () => {
    expect(getCalendarFlowMarks([])).toEqual({});
  });
});
