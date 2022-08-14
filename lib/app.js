"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StateMachine_1 = __importDefault(require("./StateMachine"));
const StateTransition_1 = __importDefault(require("./StateTransition"));
let fsm = new StateMachine_1.default("new", {
    states: ["new", "pending", "processing", "finalized", "invoiced", "paid"],
    transitions: [
        new StateTransition_1.default("new", "pending"),
        new StateTransition_1.default("pending", "pending"),
        new StateTransition_1.default("new", "processing"),
        new StateTransition_1.default("pending", "processing"),
        new StateTransition_1.default("processing", "finalized"),
        new StateTransition_1.default("finalized", "invoiced"),
        new StateTransition_1.default("invoiced", "paid"),
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
}
catch (error) {
    console.error("ERROR: ", error.message);
}
//# sourceMappingURL=app.js.map