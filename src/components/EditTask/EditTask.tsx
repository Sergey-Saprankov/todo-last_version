import React, { ChangeEvent, ChangeEventHandler } from "react";
import s from "./EditTask.module.css";
import { TaskDataType } from "../../api/api-types/api-types";
import close from "../EditToDo/img/close.svg";
import { deleteTaskTC } from "../../BLL/redux/task-reducer";
import { AppDispatch } from "../../BLL/redux/store";

type EditTaskType = {
  task: TaskDataType[];
  setAddTaskModal: (value: boolean) => void;
  addTaskModal: boolean;
};

export const EditTask: React.FC<EditTaskType> = ({
  task,
  setAddTaskModal,
  addTaskModal,
}) => {
  const dispatch = AppDispatch();
  const [
    {
      priority,
      id,
      title,
      order,
      addedDate,
      startDate,
      deadline,
      status,
      completed,
      description,
      todoListId,
    },
  ] = task;

  const statusTask =
    status === 0
      ? "TODO"
      : status === 1
      ? "DOING"
      : status === 2
      ? "DONE"
      : "DRAFT";

  const dataChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  const deleteTaskHandler = () => {
    setAddTaskModal(false);
    dispatch(deleteTaskTC(todoListId, id));
  };

  return (
    <div className={addTaskModal ? `${s.wrapper} ${s.openModal}` : s.wrapper}>
      <div className={s.innerWrapper}>
        <div className={s.container}>
          <button className={s.close}>
            <img
              onClick={() => setAddTaskModal(false)}
              className={s.closeImg}
              src={close}
              alt="close"
            />
          </button>
          <div className={s.contentWrapper}>
            <h3 className={s.title}>Edit Task</h3>

            <div className={s.blockInputTitle}>
              <label>
                Title
                <input className={s.input} type="text" placeholder={title} />
              </label>
            </div>

            <label>
              <div className={s.blockTextArea}>
                <span>Description</span>
                <textarea
                  name=""
                  placeholder={
                    description
                      ? description
                      : "e.g. It’s always good to take a break. This 15 minute break will \n" +
                        "recharge the batteries a little."
                  }
                ></textarea>
              </div>
            </label>

            <div className={s.dateContainer}>
              <label>
                <span>Start Date</span>
                <input className={s.date} type="date" />
              </label>
              <label>
                <span>Deadline</span>
                <input onChange={dataChange} className={s.date} type="date" />
              </label>
            </div>

            <div className={s.statusContainer}>
              <label>
                <span>Status</span>
                <select className={s.input}>
                  <option className={s.option}>Todo</option>
                  <option className={s.option}>Doing</option>
                  <option className={s.option}>Done</option>
                  <option className={s.option}>Draft</option>
                </select>
              </label>
            </div>

            <button
              onClick={deleteTaskHandler}
              className={`${s.btn} ${s.delete}`}
            >
              Delete
            </button>
            <button className={s.btn}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
