import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {StoreType} from "./redux-type/redux-type";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const rootReducer = combineReducers({
    todoListData: todoListReducer,
    tasksListData: taskReducer
})

export type AppDispatchType = ThunkDispatch<StoreType, any, AnyAction>

export const AppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))