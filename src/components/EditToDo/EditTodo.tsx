import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./EditTodo.module.css";
import close from "./img/close.svg";
import { useDispatch } from "react-redux";
import {
  changeTodoListTitleAC,
  deleteTodoListTC,
  removeTodoListAC,
} from "../../BLL/redux/todolist-reducer";
import { AppDispatch } from "../../BLL/redux/store";

type AddNewBoardType = {
  todolistId: string;
  modalTodo: boolean;
  setModalTodo: (value: boolean) => void;
  title: string;
};

export const EditTodo: React.FC<AddNewBoardType> = ({
  todolistId,
  setModalTodo,
  modalTodo,
  title,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState(title);
  const [error, setError] = useState("");

  useEffect(() => {
    if (newTodoTitle !== title) {
      setNewTodoTitle(title);
    }
  }, [title]);

  // const selector = (state: StoreType) => state.todoListData;
  // const todoLists = useSelector(selector)
  const dispatch = AppDispatch();
  const onClickHandler = () => {
    setModalTodo(false);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.currentTarget.value);
  };

  const addedNewToDoHandler = () => {
    if (newTodoTitle.trim()) {
      dispatch(changeTodoListTitleAC(todolistId, newTodoTitle));
      setError("");
      setModalTodo(false);
    } else {
      setError("Please add To-do List Name");
    }
  };

  const deleteToDoHandler = () => {
    dispatch(deleteTodoListTC(todolistId));
    setModalTodo(false);
  };
  return (
    <div
      className={
        modalTodo
          ? `${s.container} ${s.openModal}`
          : `${s.container} ${s.closeModal}`
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
        </div>
        <button onClick={deleteToDoHandler} className={`${s.btn} ${s.delete}`}>
          Delete
        </button>
        <button onClick={addedNewToDoHandler} className={s.btn}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
