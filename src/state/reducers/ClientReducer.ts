import { ActionMap } from "../Reducer";

export type Client = {
  height: number;
  width: number;
};

export enum ClientTypes {
  Update = "CLIENT_UPDATE"
}

type ClientPayload = {
  [ClientTypes.Update]: Client;
};

export type ClientActions = ActionMap<ClientPayload>[keyof ActionMap<
  ClientPayload
>];

export const clientReducer = (state: Client, action: ClientActions) => {
  switch (action.type) {
    case ClientTypes.Update:
      return {
        ...state,
        height: action.payload.height,
        width: action.payload.width
      };
    default:
      return state;
  }
};
