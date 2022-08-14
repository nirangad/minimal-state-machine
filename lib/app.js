"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StateMachine_1 = __importDefault(require("./StateMachine"));
const StateTransition_1 = __importDefault(require("./StateTransition"));
let fsm = new StateMachine_1.default("new", {
    states: ["new", "pending", "finalized", "done"],
    transitions: [
        new StateTransition_1.default("new", "pending"),
        new StateTransition_1.default("new", "finalized"),
        new StateTransition_1.default("pending", "finalized"),
        new StateTransition_1.default("finalized", "done"),
    ],
});
console.log(fsm);
//# sourceMappingURL=app.js.map