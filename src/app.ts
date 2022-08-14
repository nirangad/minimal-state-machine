import StateMachine from "./StateMachine";
import StateTransition from "./StateTransition";

let fsm = new StateMachine("new", {
  states: ["new", "pending", "processing", "finalized", "invoiced", "paid"],
  transitions: [
    new StateTransition("new", "pending"),
    new StateTransition("pending", "pending"),
    new StateTransition("new", "processing"),
    new StateTransition("pending", "processing"),
    new StateTransition("processing", "finalized"),
    new StateTransition("finalized", "invoiced"),
    new StateTransition("invoiced", "paid"),
  ],
});
try {
  console.log("State: ", fsm.state);
  fsm.moveTo.pending();
  console.log("State: ", fsm.state);
  fsm.moveTo.pending();
  console.log("State: ", fsm.state);
  fsm.moveTo.processing();
  console.log("State: ", fsm.state);
  fsm.moveTo.finalized();
  console.log("State: ", fsm.state);
  fsm.moveTo.invoiced();
  console.log("State: ", fsm.state);
  fsm.moveTo.paid();
  console.log("State: ", fsm.state);
  console.log("History: ", fsm.history);
} catch (error: any) {
  console.error("ERROR: ", error.message);
}
