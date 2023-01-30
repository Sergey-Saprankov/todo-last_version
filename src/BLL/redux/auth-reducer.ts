import { action } from "@storybook/addon-actions";
import { ActionType } from "./redux-type/redux-type";
import { Dispatch } from "redux";
import { setStatusAC } from "./app-reducer";
import { authApi, LoginType } from "../../api/auth-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

// thunks
export const loginTC =
  (data: LoginType) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"));

    try {
      const res = await authApi.login(data);
      if (!res.data.resultCode) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setStatusAC("succeeded"));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    } catch (e: any) {
      handleServerNetworkError(dispatch, e.message);
    }
  };

export const meTC = () => async (dispatch: Dispatch<ActionType>) => {
  dispatch(setStatusAC("loading"));

  try {
    const res = await authApi.me();
    if (!res.data.resultCode) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setStatusAC("succeeded"));
    } else {
      handleServerAppError(dispatch, res.data);
    }
  } catch (e: any) {
    handleServerNetworkError(dispatch, e.message);
  }
};
