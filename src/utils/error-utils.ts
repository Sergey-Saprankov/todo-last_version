import { setErrorAC, setStatusAC } from "../BLL/redux/app-reducer";
import { Dispatch } from "redux";
import {
  SetErrorACType,
  SetStatusACType,
} from "../BLL/redux/redux-type/redux-type";
import message from "../components/Message/Message";
import { ResponseType } from "../api/api-types/api-types";

export const handleServerNetworkError = (
  dispatch: ErrorUtilsDispatchType,
  e: { message: string }
) => {
  dispatch(setStatusAC("failed"));
  dispatch(setErrorAC(e.message));
};

export const handleServerAppError = <T>(
  dispatch: ErrorUtilsDispatchType,
  data: ResponseType<T>
) => {
  if (data.messages) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC("Sorry, technical problem"));
  }
  dispatch(setStatusAC("failed"));
};

type ErrorUtilsDispatchType = Dispatch<SetStatusACType | SetErrorACType>;
