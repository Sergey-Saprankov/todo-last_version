import { ActionType } from "./redux-type/redux-type";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStatusStateType = {
  status: StatusType;
  error: string | null;
  isOpen: boolean;
};

const initialStatusState: InitialStatusStateType = {
  status: "idle",
  error: null,
  isOpen: false,
};

export const appReducer = (
  state: InitialStatusStateType = initialStatusState,
  action: ActionType
): InitialStatusStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };

    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "SET-MODAL-STATUS":
      return { ...state, isOpen: action.isOpen };
    default:
      return state;
  }
};

export const setStatusAC = (status: StatusType) => {
  return {
    type: "APP/SET-STATUS",
    status,
  } as const;
};

export const setErrorAC = (error: string | null) => {
  return {
    type: "APP/SET-ERROR",
    error,
  } as const;
};

export const setModalStatusAC = (isOpen: boolean) => {
  return {
    type: "SET-MODAL-STATUS",
    isOpen,
  } as const;
};
