export type State = string;

export default class StateTransition {
  from: State;
  to: State;

  constructor(from: State, to: State) {
    this.from = from;
    this.to = to;
  }
}
