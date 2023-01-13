export type TodoListDataType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}



export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}



//============================Tasks type =============================================


export type TaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum  TaskStatuses  {
    New = 0,
    inProgress =  1,
    Completed,
    Draft
}

export type TaskDataType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type GetTaskResponseType = {
    items: TaskDataType[]
    totalCount: number
    error: string | null
}



