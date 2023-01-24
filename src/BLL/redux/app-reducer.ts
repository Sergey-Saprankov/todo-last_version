import { ActionType } from "./redux-type/redux-type";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStatusStateType = {
  status: StatusType;
  error: string | null;
  newTodoModal: {
    isOpen: boolean;
  };
  editTodoModal: {
    isOpen: boolean;
  };

  editTaskModal: {
    isOpen: boolean;
  };
};

const initialStatusState: InitialStatusStateType = {
  status: "idle",
  error: null,
  newTodoModal: {
    isOpen: false,
  },
  editTodoModal: {
    isOpen: false,
  },

  editTaskModal: {
    isOpen: false,
  },
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
      return { ...state, [action.modal]: { isOpen: action.isOpen } };
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

export const setModalStatusAC = (isOpen: boolean, modal: string) => {
  return {
    type: "SET-MODAL-STATUS",
    isOpen,
    modal,
  } as const;
};
