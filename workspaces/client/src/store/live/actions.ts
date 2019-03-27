export enum LiveActionTypes {
  Start = 'live/start SSE test',
  OnMessage = 'live/onMessage',
  Fail = 'live/fail',
}

type Start = { type: LiveActionTypes.Start };

export const start = (): Start => ({
  type: LiveActionTypes.Start,
});

type OnMessage = {
  type: LiveActionTypes.OnMessage;
  payload: { count: number };
};

export const onMessage = (count: number): OnMessage => ({
  type: LiveActionTypes.OnMessage,
  payload: { count },
});

type Fail = { type: LiveActionTypes.Fail; payload: { message: string } };

export const fail = (message: string): Fail => ({
  type: LiveActionTypes.Fail,
  payload: { message },
});

export type VODAction = Start | OnMessage | Fail;

export const actions = { start, onMessage, fail };

export type actionsType = typeof actions;
