export enum CounterActionTypes {
  INC = 'counter/increment',
  DEC = 'counter/decrement',
}

type IncrementAction = { type: CounterActionTypes.INC };

export const increment = ()=> ({
  type: CounterActionTypes.INC
});

type DecrementAction = { type: CounterActionTypes.DEC };

export const decrement = () => ({
  type: CounterActionTypes.DEC
});

export type CounterAction = IncrementAction | DecrementAction;

export const actions = { increment, decrement };

export type actionsType = typeof actions;
