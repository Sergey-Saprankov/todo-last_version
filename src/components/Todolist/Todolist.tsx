import React, { useEffect, useState } from "react";
import s from "./Todolist.module.css";
import setting from "./img/setting.svg";
import { EditTodo } from "../EditToDo/EditTodo";
import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import { addTaskTC, getTasksTC } from "../../BLL/redux/task-reducer";
import { Tasks } from "../Task/Tasks";
import { useParams } from "react-router-dom";
import { TodoEntityType } from "../../BLL/redux/redux-type/redux-type";

type TodolistType = {
  visible: boolean;
};

export const Todolist: React.FC<TodolistType> = React.memo(({ visible }) => {
  const { id } = useParams<{ id: string }>();

  const todoLists = useAppSelector<TodoEntityType[]>(
    (state) => state.todoListData
  );
  const currentTodo = todoLists.find((tl) => tl.id === id);
  const title = currentTodo?.title || "";
  const dispatch = AppDispatch();

  useEffect(() => {
    if (!id) return;

    dispatch(getTasksTC(id));
  }, [id]);

  const addTaskHandler = () => {
    if (!id) return;

    dispatch(addTaskTC(id, "New Task"));
  };

  const [modalEdit, setModalEdit] = useState(false);

  if (!id) return null;
  const openEditModalHandler = () => {
    setModalEdit(true);
  };

  return (
    <div className={s.container}>
      <div
        className={
          visible ? s.wrapper : `${s.wrapper} ${s.sizeWrapperHideSidebar}`
        }
      >
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
      {modalEdit && (
        <EditTodo
          todolistId={id}
          modalTodo={modalEdit}
          setModalTodo={setModalEdit}
          title={title}
        />
      )}
    </div>
  );
});
