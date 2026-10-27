import { parseStoredDays } from './parse-stored-days';
import { FLOW_LEVELS } from './types';

const parse = (stored: unknown) => parseStoredDays(JSON.stringify(stored));

describe('parseStoredDays', () => {
  it.each([
    ['nothing stored', null],
    ['an empty string', ''],
    ['malformed JSON', '{not json'],
    ['an array', '[]'],
    ['null', 'null'],
    ['a number', '42'],
  ])('returns no days for %s', (_, raw) => {
    expect(parseStoredDays(raw)).toEqual({});
  });

  it('keeps valid days', () => {
    const stored = { '2026-01-01': { date: '2026-01-01', flow: 'Heavy' } };
    expect(parse(stored)).toEqual(stored);
  });

  it.each([...FLOW_LEVELS, null])('keeps flow %p', (flow) => {
    expect(parse({ '2026-01-01': { date: '2026-01-01', flow } })).toEqual({
      '2026-01-01': { date: '2026-01-01', flow },
    });
  });

  it.each([
    ['is not an object', 'Heavy'],
    ['is null', null],
    ['has no date', { flow: 'Heavy' }],
    ['has a date that does not match its key', { date: '2026-01-02' }],
  ])('drops a day that %s', (_, day) => {
    expect(parse({ '2026-01-01': day })).toEqual({});
  });

  it.each(['abc', '2026-1-1', '2026-13-45'])(
    'drops a day whose key %p is not a real date',
    (date) => {
      expect(parse({ [date]: { date, flow: 'Heavy' } })).toEqual({});
    },
  );

  it('drops only the invalid days', () => {
    expect(
      parse({
        '2026-01-01': { date: '2026-01-01', flow: 'Heavy' },
        '2026-01-02': 'Heavy',
      }),
    ).toEqual({ '2026-01-01': { date: '2026-01-01', flow: 'Heavy' } });
  });

  it.each([42, 'Gushing'])('removes invalid flow %p and keeps the rest of the day', (flow) => {
    expect(parse({ '2026-01-01': { date: '2026-01-01', flow, mood: 'Happy' } })).toEqual({
      '2026-01-01': { date: '2026-01-01', mood: 'Happy' },
    });
  });

  it('keeps fields DailyLog does not define', () => {
    const stored = { '2026-01-01': { date: '2026-01-01', mood: 'Happy' } };
    expect(parse(stored)).toEqual(stored);
  });
});
