import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./EditTodo.module.css";
import close from "./img/close.svg";
import { useDispatch } from "react-redux";
import {
  changeTodoListTitleAC,
  deleteTodoListTC,
  removeTodoListAC,
  updateTodoListTitle,
} from "../../BLL/redux/todolist-reducer";
import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import { setModalStatusAC } from "../../BLL/redux/app-reducer";

type AddNewBoardType = {
  todolistId: string;
  title: string;
};

export const EditTodo: React.FC<AddNewBoardType> = React.memo(
  ({ todolistId, title }) => {
    const dispatch = AppDispatch();
    const isOpen = useAppSelector(
      (state) => state.appStatus.editTodoModal.isOpen
    );
    const [{ entityStatus }] = useAppSelector((state) =>
      state.todoListData.filter((t) => t.id === todolistId)
    );

    const [newTodoTitle, setNewTodoTitle] = useState(title);
    const [error, setError] = useState("");

    useEffect(() => {
      if (newTodoTitle !== title) {
        setNewTodoTitle(title);
      }
    }, [title]);

    const onClickHandler = () => {
      dispatch(setModalStatusAC(false, "editTodoModal"));
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(e.currentTarget.value);
    };

    const addedNewToDoHandler = () => {
      if (newTodoTitle.trim()) {
        dispatch(updateTodoListTitle(todolistId, newTodoTitle));
        setError("");
      } else {
        setError("Please add To-do List Name");
      }
    };

    // const editTodoListOnEnter = () => {
    //   if (newTodoTitle.trim()) {
    //     dispatch(updateTodoListTitle(todolistId, newTodoTitle));
    //     setError("");
    //     dispatch(setModalStatusAC(false, "editTodoModal"));
    //   } else {
    //     setError("Please add To-do List Name");
    //   }
    // };

    const deleteToDoHandler = () => {
      dispatch(deleteTodoListTC(todolistId));
      dispatch(setModalStatusAC(false, "editTodoModal"));
    };
    return (
      <div className={isOpen ? `${s.wrapper} ${s.openModal}` : s.wrapper}>
        <div
          className={
            isOpen ? `${s.container} ${s.openModal}` : `${s.container} `
          }
        >
          <button onClick={onClickHandler} className={s.close}>
            <img className={s.closeImg} src={close} alt="close" />
          </button>
          <div className={s.innerWrapper}>
            <h2 className={s.title}>Edit To-do List</h2>
            <div className={s.addNameContainer}>
              <div className={s.text}>To-do List Name</div>

              <input
                disabled={entityStatus === "loading"}
                // onKeyDown={editTodoListOnEnter}
                value={newTodoTitle}
                onChange={onChangeName}
                className={
                  error
                    ? `${s.changeName} ${s.text} ${s.error}`
                    : `${s.changeName} ${s.text}`
                }
                type="text"
                placeholder={"Please add To-do List Name"}
              />
            </div>
            <div className={s.columnsWrapper}>
              <div className={s.text}>To-do Columns</div>
              <div className={s.item}>todo</div>
              <div className={s.item}>doing</div>
              <div className={s.item}>done</div>
              <div className={s.item}>draft</div>
            </div>
            <button
              disabled={entityStatus === "loading"}
              onClick={deleteToDoHandler}
              className={`${s.btn} ${s.delete}`}
            >
              Delete
            </button>
            <button
              disabled={entityStatus === "loading"}
              onClick={addedNewToDoHandler}
              className={s.btn}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
);
