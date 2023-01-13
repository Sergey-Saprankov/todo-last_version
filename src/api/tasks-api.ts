import axios from "axios";
import {GetTaskResponseType, ResponseType, TaskDataType, TaskModelType} from "./api-types/api-types";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    withCredentials: true,
    headers: {
        "API-KEY": "c53fde1b-ddc6-4481-b291-1f3e2597684d"
    }
})


export const tasksAPI = {
    getTasks: (todolistId: string) => {
        return instance.get<GetTaskResponseType>(`${todolistId}/tasks`)
    },

    createTask: (todolistId: string, title: string) => {
        return instance.post<ResponseType<{ item: TaskDataType }>>(`${todolistId}/tasks`, {title})
    },

    updateTask: (todolistId: string, taskId: string, model: TaskModelType ) => {
        return instance.put<ResponseType<TaskDataType>>(`${todolistId}/tasks/${taskId}`, {model})
    },

    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    }
}

