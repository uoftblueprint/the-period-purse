import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DAILY_LOG_STORAGE_KEY,
  getLoggedDays,
  saveDay,
  saveDays,
  subscribeToDailyLog,
} from './daily-log-storage';
import type { DailyLog } from './types';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('dailyLogStorage', () => {
  it('returns [] when nothing is stored', async () => {
    expect(await getLoggedDays()).toEqual([]);
  });

  it('saves and reads days sorted by date', async () => {
    await saveDay({ date: '2026-01-02', flow: 'Light' });
    await saveDay({ date: '2026-01-01', flow: 'Heavy' });
    expect(await getLoggedDays()).toEqual([
      { date: '2026-01-01', flow: 'Heavy' },
      { date: '2026-01-02', flow: 'Light' },
    ]);
  });

  it('overwrites a field saved again for the same date', async () => {
    await saveDay({ date: '2026-01-01', flow: 'Heavy' });
    await saveDays([{ date: '2026-01-01', flow: 'Spotting' }]);
    expect(await getLoggedDays()).toEqual([{ date: '2026-01-01', flow: 'Spotting' }]);
  });

  it('keeps fields that a save does not include', async () => {
    // `mood` stands in for a field a later feature will add to DailyLog.
    await saveDay({ date: '2026-01-01', flow: 'Heavy', mood: 'Happy' } as DailyLog);
    await saveDay({ date: '2026-01-01', flow: null });
    expect(await getLoggedDays()).toEqual([{ date: '2026-01-01', flow: null, mood: 'Happy' }]);
  });

  it('keeps both fields when overlapping saves touch the same day', async () => {
    await Promise.all([
      saveDay({ date: '2026-01-01', flow: 'Heavy' }),
      saveDay({ date: '2026-01-01', mood: 'Sad' } as DailyLog),
    ]);
    expect(await getLoggedDays()).toEqual([{ date: '2026-01-01', flow: 'Heavy', mood: 'Sad' }]);
  });

  it('merges the same date passed twice in one save', async () => {
    await saveDays([
      { date: '2026-01-01', flow: 'Heavy' },
      { date: '2026-01-01', mood: 'Sad' } as DailyLog,
    ]);
    expect(await getLoggedDays()).toEqual([{ date: '2026-01-01', flow: 'Heavy', mood: 'Sad' }]);
  });

  it('stores days under the versioned key, keyed by date', async () => {
    await saveDay({ date: '2026-01-01', flow: 'Heavy' });
    const raw = await AsyncStorage.getItem(DAILY_LOG_STORAGE_KEY);
    expect(JSON.parse(raw!)).toEqual({ '2026-01-01': { date: '2026-01-01', flow: 'Heavy' } });
  });

  it('does not lose days when saves run concurrently', async () => {
    await Promise.all([
      saveDay({ date: '2026-01-01', flow: 'Heavy' }),
      saveDay({ date: '2026-01-02', flow: 'Light' }),
    ]);
    expect(await getLoggedDays()).toHaveLength(2);
  });

  it('saves over malformed data', async () => {
    await AsyncStorage.setItem(DAILY_LOG_STORAGE_KEY, '{not json');
    await saveDay({ date: '2026-01-01', flow: 'Heavy' });
    expect(await getLoggedDays()).toEqual([{ date: '2026-01-01', flow: 'Heavy' }]);
  });

  it('notifies subscribers after a save', async () => {
    const listener = jest.fn();
    const unsubscribe = subscribeToDailyLog(listener);
    await saveDay({ date: '2026-01-01', flow: 'Heavy' });
    unsubscribe();
    await saveDay({ date: '2026-01-02', flow: 'Heavy' });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
