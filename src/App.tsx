import React, {useEffect, useState} from "react";
import "./App.css";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {AddNewTodo} from "./components/AddNewBoard/AddNewTodo";
import {todoListAPI} from "./api/todolist-api";
import {useDispatch} from "react-redux";
import {getTodosTC, setTodolistAC} from "./BLL/redux/todolist-reducer";
import {AppDispatch, useAppSelector} from "./BLL/redux/store";
import {getTasksTC} from "./BLL/redux/task-reducer";
import {TaskStateType} from "./BLL/redux/redux-type/redux-type";


function App() {
    const dispatch = AppDispatch()
    const [visible, setVisible] = useState(true);
    const [modalTodo, setModalTodo] = useState(false)

    const tasks = useAppSelector<TaskStateType>(state => state.tasksListData)


    useEffect(() => {
        dispatch(getTodosTC())
    }, [])


    return (
        <div className={'container'}>
            <Header/>
            <Main visible={visible}/>
            <Sidebar callBack={setVisible} visible={visible} modalTodo={modalTodo} setModalTodo={setModalTodo}/>
            <AddNewTodo modalTodo={modalTodo} setModalTodo={setModalTodo}/>
        </div>
    );
}

export default App;
