import React, {useEffect, useState} from "react";
import axios from "axios";
import {todoListAPI} from "../api/todolist-api";

export default {
    title: "API"
};

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c53fde1b-ddc6-4481-b291-1f3e2597684d'
    }
};

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then(res => setState(res.data))
            .catch(e => {})
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
       todoListAPI.createTodoList('title')
            .then(res => setState(res.data))
            .catch(e => {})
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const id = "c9782216-abd6-4c80-be59-264778b5f9fd";
       todoListAPI.deleteTodoList(id)
            .then((res) => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const id = "fa8c76eb-e128-46e7-b6d6-55da63e3c224";
        todoListAPI.updateTodoList(id, 'update')
            .then(res => {setState(res.data)})

    }, []);

    return <div>{JSON.stringify(state)}</div>;
};