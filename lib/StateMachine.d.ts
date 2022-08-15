import StateTransition, { State } from "./StateTransition";
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
//# sourceMappingURL=StateMachine.d.ts.map