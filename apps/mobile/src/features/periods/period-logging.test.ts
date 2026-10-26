import AsyncStorage from '@react-native-async-storage/async-storage';

import { getLoggedDays, saveDays, type DailyLog } from '@/features/daily-log';

import { logPeriodDates } from './period-logging';

// Seeds days, including fields that later features will own.
async function seed(days: Record<string, unknown>[]) {
  await saveDays(days as DailyLog[]);
}

async function getDay(date: string) {
  return (await getLoggedDays()).find((day) => day.date === date);
}

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('logPeriodDates', () => {
  it('marks new days as Medium', async () => {
    await logPeriodDates(['2026-01-01', '2026-01-02'], []);
    expect(await getLoggedDays()).toEqual([
      { date: '2026-01-01', flow: 'Medium' },
      { date: '2026-01-02', flow: 'Medium' },
    ]);
  });

  it('keeps an existing flow level when marking', async () => {
    await seed([{ date: '2026-01-01', flow: 'Heavy' }]);
    await logPeriodDates(['2026-01-01'], []);
    expect(await getLoggedDays()).toEqual([{ date: '2026-01-01', flow: 'Heavy' }]);
  });

  it('marks a "None" day as Medium and keeps its other fields', async () => {
    await seed([{ date: '2026-01-01', flow: 'None', mood: 'Sad' }]);
    await logPeriodDates(['2026-01-01'], []);
    expect(await getDay('2026-01-01')).toEqual({
      date: '2026-01-01',
      flow: 'Medium',
      mood: 'Sad',
    });
  });

  it('unmarking sets flow to null and keeps other fields', async () => {
    await seed([{ date: '2026-01-01', flow: 'Heavy', mood: 'Happy', cramps: 'Bad' }]);
    await logPeriodDates([], ['2026-01-01']);
    expect(await getDay('2026-01-01')).toEqual({
      date: '2026-01-01',
      flow: null,
      mood: 'Happy',
      cramps: 'Bad',
    });
  });

  it('does not create entries when unmarking a day that was never logged', async () => {
    await logPeriodDates([], ['2026-01-01']);
    expect(await getLoggedDays()).toEqual([]);
  });

  it('marks and unmarks in one call', async () => {
    await seed([{ date: '2026-01-01', flow: 'Light' }]);
    await logPeriodDates(['2026-01-05'], ['2026-01-01']);
    expect(await getLoggedDays()).toEqual([
      { date: '2026-01-01', flow: null },
      { date: '2026-01-05', flow: 'Medium' },
    ]);
  });
});
