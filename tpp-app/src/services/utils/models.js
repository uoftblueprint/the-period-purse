/**
 * The symptoms of each day
 */
export class Symptoms {
  constructor(flow = null, mood = null, sleep = null, cramps = null, exercise = null, notes = null) {
    this.flow = flow;
    this.mood = mood;
    this.sleep = sleep;
    this.cramps = cramps;
    this.exercise = exercise;
    this.notes = notes;
  }
}

export {Symptoms};
