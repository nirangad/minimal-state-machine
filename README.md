# minimal-state-machine
Finite State machine for NodeJS with basic state transitions

# Install

```bash
$ npm install @nirangad/minimal-state-machine
```

# Usage

## Initializing the state machine

In order to begin, we need to import ```StateMachine```, ```StateTransition``` & ```State```

```typescript
import StateMachine, {
  StateTransition,
  State,
} from "@nirangad/minimal-state-machine";
```

```State``` is just another ```string``` type. Set of states need to be defined before initializing the ```StateMachine```

```typescript
const states = ["new", "pending", "processing", "finalized", "invoiced", "paid"];
```

Then we need to define allowed transitions based on defined states. For that we use ```StateTransition```

```typescript
const transitions =  [
    new StateTransition("new", "pending"),
    new StateTransition("pending", "pending"),
    new StateTransition("new", "processing"),
    new StateTransition("pending", "processing"),
    new StateTransition("processing", "finalized"),
    new StateTransition("finalized", "invoiced"),
    new StateTransition("invoiced", "paid"),
]
```

Finally we can initialize the ```StateMachine``` by providing the initial state, all available states and state transitions.

```typescript
const initialState = states[0];
const fsm = new StateMachine(initialState, states, transitions);
```

## Using the state machine

```StateMachine``` will generate functions for state transitions based on provided states. Those will be available in ```moveTo``` property.

### Get current state
```typescript
// Prints 'new'
console.log("State: ", fsm.state);
```

### Transitioning to next allowed state
```typescript
// Moving to 'pending' state from 'new' state
fsm.moveTo.pending();

// Prints 'pending'
console.log("State: ", fsm.state);
```

### Invalid transitions
```typescript
// Trying to move to 'finalized' state from 'pending' state
// Prints 'ERROR:  Invalid state transition: From pending to finalized'
fsm.moveTo.finalized();
```

### Reset the state machine
```typescript
// Trying to move to 'finalized' state from 'pending' state
// Prints 'ERROR:  Invalid state transition: From pending to finalized'
fsm.reset();

// Prints 'new'
console.log("State: ", fsm.state);
```

### Passing a callback function
```typescript
// Moving to 'pending' state from 'new' state with a callback function
fsm.moveTo.pending((previousState: State, newState: State) => {
  console.log(`In Callback function: From ${previousState} to ${newState}`);
});

// Prints 'pending'
console.log("State: ", fsm.state);
```