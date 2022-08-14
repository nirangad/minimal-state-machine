import StateMachine from "./StateMachine";
import StateTransition, { State } from "./StateTransition";

let fsm = new StateMachine("new", {
  states: ["new", "pending", "finalized", "done"],
  transitions: [
    new StateTransition("new", "pending"),
    new StateTransition("new", "finalized"),
    new StateTransition("pending", "finalized"),
    new StateTransition("finalized", "done"),
  ],
});
console.log(fsm);
