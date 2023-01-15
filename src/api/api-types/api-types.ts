export type TodoListDataType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
  fieldsErrors: string[];
};

//============================Tasks type =============================================

export type TaskModelType = {
  title: string;
  description: string;
  completed?: boolean;
  status: TaskStatusesType;
  priority: TaskPrioritiesType;
  startDate: string;
  deadline: string;
};

export enum TaskStatusesType {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPrioritiesType {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type TaskDataType = {
  addedDate: string;
  deadline: string;
  description: string;
  id: string;
  order: number;
  priority: number;
  startDate: string;
  status: number;
  title: string;
  todoListId: string;
};

export type GetTaskResponseType = {
  items: TaskDataType[];
  totalCount: number;
  error: string | null;
};
