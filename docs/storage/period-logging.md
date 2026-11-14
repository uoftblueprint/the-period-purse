# Period logging storage

Flow and notes persist locally through AsyncStorage on the device or simulator, including when using Expo Go. There is no backend sync or account separation.

Implementation: [daily-log-storage.ts](../../apps/mobile/src/features/daily-log/daily-log-storage.ts).

## Key and format

All days are stored as one JSON object under `dailyLog:days:v1`. AsyncStorage is scoped to the app, so the key does not need an app-name prefix. Only this key is read and written; no other key is migrated.

```json
{
  "2026-11-01": {
    "date": "2026-11-01",
    "flow": "Heavy",
    "notes": "Cramps in the morning"
  }
}
```

Dates use local `YYYY-MM-DD`. Flow accepts `None`, `Spotting`, `Light`, `Medium`, or `Heavy`; notes are limited to 500 characters. `None` is an explicit flow option and does not count as a period day.

## Types in code

- **`DailyLog`**: one day's record, containing `date`, optional `flow`, and optional `notes`.
- **`DailyLogSchema`**: the validation rules from which TypeScript infers `DailyLog`.
- **`FlowLevel`**: the five allowed flow strings.
- **`StoredDays = Record<string, DailyLog>`**: the complete object mapping date strings to daily records.

Definitions: [types.ts](../../apps/mobile/src/features/daily-log/types.ts), [flow-levels.ts](../../apps/mobile/src/features/daily-log/flow-levels.ts), and [parse-stored-days.ts](../../apps/mobile/src/features/daily-log/parse-stored-days.ts). `FLOW_LEVEL` contains the named flow constants; `FLOW_LEVELS` derives their values for schema validation.

**Flow and notes are optional to support partial saves.** The same `DailyLog` type describes stored records and save inputs, so a day can contain only flow or only notes:

- `{ date, flow: 'Heavy' }` updates flow and preserves existing notes.
- `{ date, notes: 'Cramps' }` updates notes and preserves existing flow.
- `{ date, flow: null }` explicitly clears flow and preserves notes.

Omitting a field leaves its stored value unchanged; passing `null` clears it.

## Saving

- **Single date:** Save merges flow and trimmed notes into the existing day. Empty notes become `null`.
- **Multiple dates:** Only changes from the original selections are saved. Newly marked days default to Medium; existing flow levels remain intact. Unmarking clears flow and preserves notes. Reverting every selection makes no change.
- **Calendar:** Successful saves notify subscribers to reload the saved colors and flow icons. Drafts remain local to the form until saved.

A shared write queue serializes saves so overlapping writes preserve unrelated days and fields.

## Errors and limits

Failed loads block editing until retry; failed saves retain the draft. Missing or malformed stored JSON reads as an empty collection. Invalid entries or field values are discarded during parsing, while unknown fields are preserved.

Records survive app restarts. Clearing the app's local data removes them.
