import axios from "axios";
import {
    ResponseType,
    TodoListDataType
} from "./api-types/api-types";




const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "c53fde1b-ddc6-4481-b291-1f3e2597684d"
    }
});


export const todoListAPI = {
    getTodoLists: () => {
        return instance.get<TodoListDataType[]>(`todo-lists`);
    },

    createTodoList: (title: string) => {
        return instance.post<ResponseType<{item: TodoListDataType}>>(`todo-lists`, {title});
    },

    deleteTodoList: (todolistId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },

    updateTodoList: (todolistId: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    }
};