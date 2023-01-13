import {
  addTaskAC,
  changeTaskPriorityAC,
  changeTaskTitleAC,
  deleteTaskAC,
  setTasksAC,
  sortTaskAC,
  taskIsDoneAC,
  updateTaskAC,
} from "../task-reducer";
import {
  addTodoListAC,
  changeFilterTodoListAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  setTodolistAC,
} from "../todolist-reducer";
import { rootReducer } from "../store";
import {
  TaskDataType,
  TodoListDataType,
} from "../../../api/api-types/api-types";

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type ChangeTaskPriorityACType = ReturnType<typeof changeTaskPriorityAC>;
export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>;
export type TaskIsDoneACType = ReturnType<typeof taskIsDoneAC>;
export type SortTaskACType = ReturnType<typeof sortTaskAC>;
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>;

export type AddTodoListACType = ReturnType<typeof addTodoListAC>;
export type ChangeFilterTodoListACType = ReturnType<
  typeof changeFilterTodoListAC
>;
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type ChangeTodoListTitleACType = ReturnType<
  typeof changeTodoListTitleAC
>;
export type SetTodolistACType = ReturnType<typeof setTodolistAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;

export type ActionType =
  | AddTodoListACType
  | AddTaskACType
  | ChangeTaskPriorityACType
  | DeleteTaskACType
  | TaskIsDoneACType
  | SortTaskACType
  | ChangeFilterTodoListACType
  | RemoveTodoListACType
  | ChangeTodoListTitleACType
  | ChangeTaskTitleACType
  | SetTodolistACType
  | SetTasksACType
  | UpdateTaskACType;

// export type TaskType = {
//     taskId: string
//     taskTitle: string
//     priority: string
//     description: string
//     isDone: boolean
// }
//

export type TaskStateType = {
  [key: string]: TaskDataType[];
};

export type FilterTaskType = "active" | "completed" | "all";

export type TodoEntityType = TodoListDataType;

export type StoreType = ReturnType<typeof rootReducer>;
