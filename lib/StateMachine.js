"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateTransition = void 0;
class StateMachine {
    constructor(initialState, options) {
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
            throw new Error(`Invalid state transition(s): ${validStatus.error.join(",")}`);
        }
        this.generateFSM();
    }
    get state() {
        return this._state;
    }
    get history() {
        return this._history;
    }
    reset() {
        this._state = this._initialState;
        this._history = [];
    }
    posibilities() {
        return this._moveFromRules[this._state] || [];
    }
    generateFSM() {
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
                this.moveTo[transition.to] = (postTransitionCallback) => {
                    if (this._moveToRules[transition.to] != undefined &&
                        Array.isArray(this._moveToRules[transition.to]) &&
                        this._moveToRules[transition.to].includes(this._state)) {
                        let previousState = this._state;
                        this._history.push(previousState);
                        this._state = transition.to;
                        if (postTransitionCallback) {
                            postTransitionCallback(previousState, this._state);
                        }
                    }
                    else {
                        throw new Error(`Invalid state transition: From ${this._state} to ${transition.to}`);
                    }
                };
            }
        });
    }
    validate() {
        const allTos = Array.from(new Set(this.transitions.map((transistion) => transistion.to)));
        const allFroms = Array.from(new Set(this.transitions.map((transistion) => transistion.from)));
        const allStates = allTos.concat(allFroms.filter((item) => allTos.indexOf(item) < 0));
        const invalidStates = allStates.filter((item) => this.states.indexOf(item) < 0);
        return invalidStates.length == 0
            ? { valid: true, error: undefined }
            : { valid: false, error: invalidStates };
    }
}
exports.default = StateMachine;
class StateTransition {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}
exports.StateTransition = StateTransition;
