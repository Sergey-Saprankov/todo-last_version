import React, { useEffect, useState } from "react";
import s from "./Todolist.module.css";
import setting from "./img/setting.svg";
import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import { addTaskTC, getTasksTC } from "../../BLL/redux/task-reducer";
import { useLocation, useParams } from "react-router-dom";
import { TodoEntityType } from "../../BLL/redux/redux-type/redux-type";
import { setModalStatusAC, StatusType } from "../../BLL/redux/app-reducer";
import { Tasks } from "../Task/Tasks";
import { EditTodo } from "../EditToDo/EditTodo";
import Message from "../Message/Message";
import Loading from "../Loading/Loading";

export const Todolist = React.memo(() => {
  const dispatch = AppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    dispatch(getTasksTC(id));
  }, [id]);

  const todoLists = useAppSelector<TodoEntityType[]>(
    (state) => state.todoListData
  );
  const {
    status,
    editTodoModal: { isOpen },
  } = useAppSelector((state) => state.appStatus);

  const currentTodo = todoLists.find((tl) => tl.id === id);

  const title = currentTodo?.title || "";

  const addTaskHandler = () => {
    if (!id) return;

    dispatch(addTaskTC(id, "New Task"));
  };

  if (!id) return null;
  const openEditModalHandler = () => {
    dispatch(setModalStatusAC(true, "editTodoModal"));
  };

  return (
    <div className={s.container}>
      <Message />
      {status === "loading" && <Loading />}
      <div className={s.wrapper}>
        <div className={s.settingContainer}>
          <div>
            <button onClick={addTaskHandler} className={s.addTask}>
              Add Task +
            </button>
          </div>
          <div onClick={openEditModalHandler}>
            <img className={s.settingImg} src={setting} alt="setting" />
          </div>
        </div>

        <div className={s.tasksContainer}>
          <Tasks todoListId={id} />
        </div>
      </div>
      {isOpen && <EditTodo todolistId={id} title={title} />}
    </div>
  );
});
