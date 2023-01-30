import axios from "axios";
import { ResponseType, TodoListDataType } from "./api-types/api-types";
import { instance } from "./instance";

export const todoListAPI = {
  getTodoLists: () => {
    return instance.get<TodoListDataType[]>(`todo-lists`);
  },

  createTodoList: (title: string) => {
    return instance.post<ResponseType<{ item: TodoListDataType }>>(
      `todo-lists`,
      { title }
    );
  },

  deleteTodoList: (todolistId: string) => {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updateTodoList: (todolistId: string, title: string) => {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
};
