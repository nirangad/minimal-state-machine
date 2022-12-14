export default class StateMachine {
  // Initial state
  private readonly _initialState: State;
  // Current State of the FSM
  private _state: State;

  // All available states
  readonly states: State[];

  // All available State Transitions
  readonly transitions: StateTransition[];

  // Available actions based on State Transitions
  moveTo: { [key: string]: Function };

  // Conditions for available actions
  private _moveToRules: { [key: string]: string[] };

  // Conditions for possibile actions
  private _moveFromRules: { [key: string]: string[] };

  // State change history tracker
  private _history: State[];

  constructor(
    initialState: State,
    options: { states: State[]; transitions: StateTransition[] }
  ) {
    this._initialState = initialState;
    this._state = initialState;
    this.states = options.states;
    this.transitions = options.transitions;
    this.moveTo = {};
    this._moveToRules = {};
    this._moveFromRules = {};

    this._history = [];

    let validStatus = this.validate();
    if (!validStatus.valid) {
      this.states = [];
      this.transitions = [];

      throw new Error(
        `Invalid state transition(s): ${validStatus.error!.join(",")}`
      );
    }

    this.generateFSM();
  }

  get state(): State {
    return this._state;
  }

  get history(): State[] {
    return this._history;
  }

  reset(): void {
    this._state = this._initialState;
    this._history = [];
  }

  posibilities(): State[] {
    return this._moveFromRules[this._state] || [];
  }

  private generateFSM(): void {
    this.transitions.forEach((transition) => {
      if (!Array.isArray(this._moveToRules[transition.to])) {
        this._moveToRules[transition.to] = [];
      }

      if (!Array.isArray(this._moveFromRules[transition.from])) {
        this._moveFromRules[transition.from] = [];
      }

      if (!this._moveToRules[transition.to].includes(transition.from)) {
        this._moveToRules[transition.to].push(transition.from);
      }

      if (!this._moveFromRules[transition.from].includes(transition.to)) {
        this._moveFromRules[transition.from].push(transition.to);
      }

      if (this.moveTo[transition.to] == undefined) {
        this.moveTo[transition.to] = (
          postTransitionCallback?: (prevState: string, newState: string) => void
        ) => {
          if (
            this._moveToRules[transition.to] != undefined &&
            Array.isArray(this._moveToRules[transition.to]) &&
            this._moveToRules[transition.to].includes(this._state)
          ) {
            let previousState = this._state;
            this._history.push(previousState);

            this._state = transition.to;
            if (postTransitionCallback) {
              postTransitionCallback(previousState, this._state);
            }
          } else {
            throw new Error(
              `Invalid state transition: From ${this._state} to ${transition.to}`
            );
          }
        };
      }
    });
  }

  private validate(): { valid: boolean; error: undefined | string[] } {
    const allTos = Array.from(
      new Set(this.transitions.map((transistion) => transistion.to))
    );
    const allFroms = Array.from(
      new Set(this.transitions.map((transistion) => transistion.from))
    );

    const allStates = allTos.concat(
      allFroms.filter((item) => allTos.indexOf(item) < 0)
    );

    const invalidStates = allStates.filter(
      (item) => this.states.indexOf(item) < 0
    );

    return invalidStates.length == 0
      ? { valid: true, error: undefined }
      : { valid: false, error: invalidStates };
  }
}

export type State = string;

export class StateTransition {
  from: State;
  to: State;

  constructor(from: State, to: State) {
    this.from = from;
    this.to = to;
  }
}
