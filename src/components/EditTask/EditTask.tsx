import React, { ChangeEvent, useState } from "react";
import s from "./EditTask.module.css";
import { TaskDataType, TaskModelType } from "../../api/api-types/api-types";
import close from "../EditToDo/img/close.svg";
import {
  deleteTaskTC,
  UpdateDomainTaskModelType,
  updateTaskTC,
} from "../../BLL/redux/task-reducer";
import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import { setModalStatusAC } from "../../BLL/redux/app-reducer";

type EditTaskType = {
  task: TaskDataType;
};

export const EditTask: React.FC<EditTaskType> = React.memo(({ task }) => {
  const dispatch = AppDispatch();
  const isOpen = useAppSelector(
    (state) => state.appStatus.editTaskModal.isOpen
  );

  let {
    priority,
    id,
    title,
    order,
    addedDate,
    startDate,
    deadline,
    status,
    description,
    todoListId,
  } = task;

  const [newTitle, setNewTitle] = useState(title);

  const [newDescription, setNewDescription] = useState(
    description ? description : ""
  );
  const [newStartDate, setNewStartDate] = useState(
    startDate ? startDate : "2023-01-13"
  );
  const [newDeadline, setNewDeadline] = useState(
    deadline ? deadline : "2023-02-13"
  );
  const [newStatus, setNewStatus] = useState(status);

  const closeModalHandler = () => {
    setNewTitle(title);
    setNewDescription(description ? description : "");
    setNewStartDate(startDate ? startDate : "2023-01-13");
    setNewDeadline(deadline ? deadline : "2023-02-13");
    setNewStatus(0);
    dispatch(setModalStatusAC(false, "editTaskModal"));
  };

  const model: UpdateDomainTaskModelType = {
    title: newTitle,
    description: newDescription,
    status: newStatus,
    priority,
    startDate: newStartDate,
    deadline: newDeadline,
  };

  const onChangeDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDeadline(e.currentTarget.value);
  };

  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStartDate(e.currentTarget.value);
  };

  const deleteTaskHandler = () => {
    dispatch(setModalStatusAC(false, "editTaskModal"));
    dispatch(deleteTaskTC(todoListId, id));
  };

  const saveChangesTask = () => {
    dispatch(updateTaskTC(todoListId, id, model));
    // setAddTaskModal(false);
  };

  const onChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.currentTarget.value);
  };

  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(Number(e.currentTarget.value));
  };

  return (
    <div className={isOpen ? `${s.wrapper} ${s.openModal}` : s.wrapper}>
      <div className={s.innerWrapper}>
        <div className={s.container}>
          <button className={s.close}>
            <img
              onClick={closeModalHandler}
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
                <input
                  onChange={onChangeTitleTask}
                  value={newTitle}
                  className={s.input}
                  type="text"
                  placeholder={"Add your title"}
                />
              </label>
            </div>

            <label>
              <div className={s.blockTextArea}>
                <span>Description</span>
                <textarea
                  onChange={onChangeTextArea}
                  value={newDescription}
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
                <input
                  onChange={onChangeStartDate}
                  value={newStartDate}
                  className={s.date}
                  type="date"
                />
              </label>
              <label>
                <span>Deadline</span>
                <input
                  value={newDeadline}
                  onChange={onChangeDeadline}
                  className={s.date}
                  type="date"
                />
              </label>
            </div>

            <div className={s.statusContainer}>
              <label>
                <span>Status</span>
                <select
                  value={newStatus}
                  onChange={onChangeStatus}
                  className={s.input}
                >
                  <option value={0}>Todo</option>
                  <option value={1}>Doing</option>
                  <option value={2}>Done</option>
                  <option value={3}>Draft</option>
                </select>
              </label>
            </div>

            <button
              onClick={deleteTaskHandler}
              className={`${s.btn} ${s.delete}`}
            >
              Delete
            </button>
            <button onClick={saveChangesTask} className={s.btn}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
