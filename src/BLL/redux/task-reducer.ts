import { ActionType, StoreType, TaskStateType } from "./redux-type/redux-type";
import {
  TaskDataType,
  TaskModelType,
  TaskPrioritiesType,
  TaskStatusesType,
} from "../../api/api-types/api-types";
import { Dispatch } from "redux";
import { tasksAPI } from "../../api/tasks-api";

const initialStateTask: TaskStateType = {};

export const taskReducer = (
  state: TaskStateType = initialStateTask,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case "SET-TASKS":
      return { ...state, [action.todoListId]: action.tasks };

    case "SET-TODOS":
      const copyState = { ...state };
      action.todos.forEach((t) => (copyState[t.id] = []));
      return copyState;

    case "ADD-TODO-LIST":
      return { ...state, [action.todo.id]: [] };

    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          ...state[action.task.todoListId],
          action.task,
        ],
      };
    case "REMOVE-TODO-LIST":
      delete state[action.todoListId];
      return { ...state };
    case "DELETE_TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case "UPDATE-TASK":
      console.log(action.model);
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    default:
      return state;
  }
};

export const addTaskAC = (task: TaskDataType) => {
  return {
    type: "ADD-TASK",
    task,
  } as const;
};

export const changeTaskPriorityAC = (
  priority: string,
  todoListId: string,
  taskId: string,
  isDone: boolean
) => {
  return {
    type: "CHANGE-PRIORITY",
    priority,
    todoListId,
    taskId,
    isDone,
  } as const;
};

export const deleteTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "DELETE_TASK",
    todoListId,
    taskId,
  } as const;
};

export const taskIsDoneAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
) => {
  return {
    type: "TASK-IS-DONE",
    todoListId,
    taskId,
    isDone,
  } as const;
};

export const sortTaskAC = (todoListId: string) => {
  return {
    type: "SORT-TASK",
    todoListId,
  } as const;
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  taskTitle: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    todoListId,
    taskId,
    taskTitle,
  } as const;
};

export const setTasksAC = (tasks: TaskDataType[], todoListId: string) => {
  return {
    type: "SET-TASKS",
    tasks,
    todoListId,
  } as const;
};

export const updateTaskAC = (
  todoListId: string,
  taskId: string,
  model: TaskDataType
) => {
  return {
    type: "UPDATE-TASK",
    taskId,
    model,
    todoListId,
  } as const;
};

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
  tasksAPI.getTasks(todoListId).then((res) => {
    dispatch(setTasksAC(res.data.items, todoListId));
  });
};

export const addTaskTC =
  (todoListId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todoListId, title).then((res) => {
      dispatch(addTaskAC(res.data.data.item));
    });
  };

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatusesType;
  priority?: TaskPrioritiesType;
  startDate?: string;
  deadline?: string;
};

export const updateTaskTC =
  (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => StoreType) => {
    const state = getState();
    const [task] = state.tasksListData[todoListId].filter(
      (t) => t.id === taskId
    );

    if (!task) {
      console.log("task not found");
      return;
    }

    const apiModel: TaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    };

    tasksAPI.updateTask(todoListId, taskId, apiModel).then((res) => {
      dispatch(updateTaskAC(todoListId, taskId, res.data.data.item));
    });
  };

export const deleteTaskTC =
  (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoListId, taskId).then((res) => {
      dispatch(deleteTaskAC(todoListId, taskId));
    });
  };
