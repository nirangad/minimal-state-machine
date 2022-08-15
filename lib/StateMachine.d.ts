export default class StateMachine {
    private _state;
    readonly states: State[];
    readonly transitions: StateTransition[];
    moveTo: {
        [key: string]: Function;
    };
    private _moveToRules;
    private _history;
    constructor(initialState: State, options: {
        states: State[];
        transitions: StateTransition[];
    });
    get state(): State;
    get history(): State[];
    private generateFSM;
    private validate;
}
export declare type State = string;
export declare class StateTransition {
    from: State;
    to: State;
    constructor(from: State, to: State);
}
