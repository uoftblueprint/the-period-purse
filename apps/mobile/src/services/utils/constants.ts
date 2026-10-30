// Migrated from the legacy tpp-app/src/services/utils/constants.js.
export const FILTER_COLOURS = {
  FLOW: {
    HEAVY: '#D42629',
    MEDIUM: '#E44545',
    LIGHT: '#E3797A',
    SPOTTING: '#FFBEBF',
    NONE: '#FFEBEB',
  },
  CRAMPS: {
    NEUTRAL: '#DFA638',
    BAD: '#DD8502',
    TERRIBLE: '#B85A04',
    GOOD: '#FFD363',
    NONE: '#FFE6A6',
  },
  EXERCISE: {
    HEAVY: '#2F5B54',
    MEDIUM: '#5A9F93',
    LIGHT: '#7BCFC0',
    LITTLE: '#B9E0D8',
  },
  SLEEP: {
    HEAVY: '#133364',
    MEDIUM: '#1A50A0',
    LIGHT: '#467CCD',
    LITTLE: '#92B8F0',
  },
  OVULATION: {
    OVULATING: '#69DAC6',
    PREDICTED_OVULATION: '#55AD9EFF',
  },
  DISABLED: '#EEEEEE',
  NOFILTER: '#FFFFFF',
} as const;

export const FILTER_TEXT_COLOURS = {
  FLOW: {
    HEAVY: '#000',
    MEDIUM: '#000',
    LIGHT: '#000',
    SPOTTING: '#000',
    NONE: '#000',
  },
  CRAMPS: {
    NEUTRAL: '#000',
    BAD: '#000',
    TERRIBLE: '#000',
    GOOD: '#000',
    NONE: '#000',
  },
  EXERCISE: {
    HEAVY: '#FFF',
    MEDIUM: '#FFF',
    LIGHT: '#FFF',
    LITTLE: '#000',
  },
  SLEEP: {
    HEAVY: '#FFF',
    MEDIUM: '#FFF',
    LIGHT: '#FFF',
    LITTLE: '#000',
  },
  OVULATION: {
    OVULATING: '#000',
  },
  DISABLED: '#AAAAAA',
  NOFILTER: '#000000',
} as const;
