import axios from "axios";
import {
  GetTaskResponseType,
  ResponseType,
  TaskDataType,
  TaskModelType,
} from "./api-types/api-types";
import { instance } from "./instance";

export const tasksAPI = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`);
  },

  createTask: (todolistId: string, title: string) => {
    return instance.post<ResponseType<{ item: TaskDataType }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title }
    );
  },

  updateTask: (todolistId: string, taskId: string, model: TaskModelType) => {
    return instance.put<ResponseType<{ item: TaskDataType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },

  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<ResponseType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
};
