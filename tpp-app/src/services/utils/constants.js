export const FLOW_LEVEL = {
  NONE: "NONE",
  LIGHT: "LIGHT",
  MEDIUM: "MEDIUM",
  HEAVY: "HEAVY",
  SPOTTING: "SPOTTING"
}

export const MOOD_LEVEL = {
  HAPPY: "HAPPY",
  SAD: "SAD",
  NEUTRAL: "NEUTRAL",
  SICK: "SICK",
  ANGRY: "ANGRY",
  LOL: "LOL",
  IDK: "IDK",
  GREAT: "GREAT",
  LOVED: "LOVED"
}

export const CRAMP_LEVEL = {
  NEUTRAL: "NEUTRAL",
  BAD: "BAD",
  TERRIBLE: "TERRIBLE",
  GOOD: "GOOD",
  NONE: "NONE",
}

export const EXERCISE_TYPE = {
  CARDIO: "CARDIO",
  YOGA: "YOGA",
  STRENGTH: "STRENGTH",
  BALL_SPORT: "BALL_SPORT",
  MARTIAL_ARTS: "MARTIAL_ARTS",
  WATER_SPORT: "WATER_SPORT",
  CYCLE_SPORT: "CYCLE_SPORT",
  RACKET_SPORT: "RACKET_SPORT",
  WINTER_SPORT: "WINTER_SPORT"
}

export const TRACK_SYMPTOMS = {
  FLOW: 'trackFlow',
  MOOD: 'trackMood',
  SLEEP: 'trackSleep',
  CRAMPS: 'trackCramps',
  EXERCISE: 'trackExercise'
}

export const FILTER_COLOURS = {
  FLOW: {
    HEAVY: '#D42629',
    MEDIUM: '#E44545',
    LIGHT: '#E3797A',
    SPOTTING: '#FFBEBF',
    NONE: "#FFEBEB",
  },
  CRAMPS: {
    NEUTRAL: "#DFA638",
    BAD: "#DD8502",
    TERRIBLE: "#B85A04",
    GOOD: "#FFD363",
    NONE: "#FFE6A6",  
  },
  EXERCISE: {
    HEAVY: '#2F5B54',
    MEDIUM: '#5A9F93',
    LIGHT: '#7BCFC0',
    LITTLE: '#B9E0D8'   
  },
  SLEEP: {
    HEAVY: '#133364',
    MEDIUM: '#1A50A0',
    LIGHT: '#467CCD',
    LITTLE: '#92B8F0',
  }
}

export const FILTER_TEXT_COLOURS = {
  FLOW: {
    HEAVY: '#FFF',
    MEDIUM: '#FFF',
    LIGHT: '#FFF',
    SPOTTING: '#000',
    NONE: '#000',
  },
  CRAMPS: {
    NEUTRAL: "#000",
    BAD: "#000",
    TERRIBLE: "#000",
    GOOD: "#000",
    NONE: "#000",  
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
  }
}

export const VIEWS = {
  Flow: "Period Flow",
  Nothing: "Select",
  Mood: "Mood",
  Exercise: "Exercise",
  Cramps: "Cramps",
  Sleep: "Sleep"
}

export const KEYS = {
  AVERAGE_PERIOD_LENGTH: "averagePeriodLength",
  INITIAL_PERIOD_LENGTH: "initialPeriodLength",
  SELECTED_YEAR: "selectedYear",
  SELECTED_MONTH: "selectedMonth",
  SELECTED_VIEW: "selectedView"
}
