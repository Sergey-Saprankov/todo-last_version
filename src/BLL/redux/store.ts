import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import { todoListReducer } from "./todolist-reducer";
import { taskReducer } from "./task-reducer";
import thunk, { ThunkDispatch, ThunkAction } from "redux-thunk";
import { ActionType, StoreType } from "./redux-type/redux-type";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./app-reducer";

export const rootReducer = combineReducers({
  appStatus: appReducer,
  todoListData: todoListReducer,
  tasksListData: taskReducer,
});

export type AppDispatchType = ThunkDispatch<StoreType, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreType,
  unknown,
  ActionType
>;

export const AppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
