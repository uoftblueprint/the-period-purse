import { getCalendarFlowMarks } from './calendar-flow-marks';

describe('getCalendarFlowMarks', () => {
  it('uses legacy colors for all explicit flow levels, including None, and leaves unset flow unmarked', () => {
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

    expect(Object.keys(marks)).toEqual(['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05']);
    expect(Object.values(marks).map((mark) => mark.selectedColor)).toEqual([
      '#E3797A', '#E44545', '#D42629', '#FFBEBF', '#FFEBEB',
    ]);
    for (const mark of Object.values(marks)) {
      expect(mark.selected).toBe(true);
      expect(mark.selectedTextColor).toBe('#000');
    }
    expect(JSON.stringify(days)).toBe(before);
  });

  it('leaves a new calendar empty instead of supplying demonstration flow records', () => {
    expect(getCalendarFlowMarks([])).toEqual({});
  });
});
