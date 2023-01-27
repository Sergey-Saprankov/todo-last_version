import { v1 } from "uuid";
import {
  ActionType,
  FilterTaskType,
  TodoEntityType,
} from "./redux-type/redux-type";
import { Dispatch } from "redux";
import { todoListAPI } from "../../api/todolist-api";
import { TodoListDataType } from "../../api/api-types/api-types";
import { AppThunk } from "./store";
import { setStatusAC, StatusType } from "./app-reducer";

export const initialState: TodoEntityType[] = [];

export const todoListReducer = (
  state: TodoEntityType[] = initialState,
  action: ActionType
): TodoEntityType[] => {
  switch (action.type) {
    case "SET-TODOS":
      return action.todos;
    case "ADD-TODO-LIST":
      return [{ ...action.todo, entityStatus: "idle" }, ...state];
    case "REMOVE-TODO-LIST":
      return [...state.filter((t) => t.id !== action.todoListId)];
    // case 'CHANGE-FILTER':
    //     return [...state.map(t => t.id === action.todoListId ? {...t, filter: action.filter} : t)]
    case "CHANGE-TODO-LIST-TITLE":
      return [
        ...state.map((t) =>
          t.id === action.todoListId ? { ...t, title: action.todoListTitle } : t
        ),
      ];
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return [
        ...state.map((t) =>
          t.id === action.id ? { ...t, entityStatus: action.entityStatus } : t
        ),
      ];
    default:
      return state;
  }
};

export const addTodoListAC = (todo: TodoListDataType) => {
  return {
    type: "ADD-TODO-LIST",
    todo,
  } as const;
};

export const changeFilterTodoListAC = (
  todoListId: string,
  filter: FilterTaskType
) => {
  return {
    type: "CHANGE-FILTER",
    todoListId,
    filter,
  } as const;
};

export const removeTodoListAC = (todoListId: string) => {
  return {
    type: "REMOVE-TODO-LIST",
    todoListId,
  } as const;
};

export const changeTodoListTitleAC = (
  todoListId: string,
  todoListTitle: string
) => {
  return {
    type: "CHANGE-TODO-LIST-TITLE",
    todoListId,
    todoListTitle,
  } as const;
};

export const setTodolistAC = (todos: TodoEntityType[]) => {
  return {
    type: "SET-TODOS",
    todos,
  } as const;
};

export const getTodosTC = (): AppThunk => (dispatch) => {
  dispatch(setStatusAC("loading"));
  todoListAPI.getTodoLists().then((res) => {
    dispatch(setTodolistAC(res.data));
    dispatch(setStatusAC("succeeded"));
  });
};

export const deleteTodoListTC =
  (todoListId: string): AppThunk =>
  (dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"));
    dispatch(setStatusAC("loading"));
    todoListAPI.deleteTodoList(todoListId).then((res) => {
      dispatch(removeTodoListAC(todoListId));
      dispatch(setStatusAC("succeeded"));
      dispatch(changeTodolistEntityStatusAC(todoListId, "succeeded"));
    });
  };

export const addTodoListTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setStatusAC("loading"));
    todoListAPI.createTodoList(title).then((res) => {
      dispatch(addTodoListAC(res.data.data.item));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const updateTodoListTitle =
  (todoListId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"));
    dispatch(setStatusAC("loading"));
    todoListAPI.updateTodoList(todoListId, title).then((res) => {
      dispatch(changeTodoListTitleAC(todoListId, title));
      dispatch(setStatusAC("succeeded"));
      dispatch(changeTodolistEntityStatusAC(todoListId, "succeeded"));
    });
  };

export const changeTodolistEntityStatusAC = (
  id: string,
  entityStatus: StatusType
) => {
  return {
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    entityStatus,
  } as const;
};
