import React, { useState } from "react";
import { useAppSelector } from "../../BLL/redux/store";
import { TaskStateType } from "../../BLL/redux/redux-type/redux-type";
import s from "./Tasks.module.css";
import setting from "./img/setting.svg";
import { EditTask } from "../EditTask/EditTask";

type TaskType = {
  todoListId: string;
};

export const Tasks: React.FC<TaskType> = ({ todoListId }) => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const tasks = useAppSelector<TaskStateType>((state) => state.tasksListData);
  const currentTasks = tasks[todoListId];
  if (!currentTasks) return null;

  const todo = currentTasks?.filter((t) => t.status === 0);
  const doing = currentTasks?.filter((t) => t.status === 1);
  const done = currentTasks?.filter((t) => t.status === 2);
  const draft = currentTasks?.filter((t) => t.status === 3);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.column}>
          <div className={s.titleContainer}>
            <div className={`${s.circle} ${s.todo}`} />
            <h2 className={s.title}>todo({todo.length})</h2>
          </div>
          {todo.map((t) => {
            const changeTaskHandler = () => {
              setAddTaskModal(true);
            };
            return (
              <div className={s.blockTask} key={t.id}>
                <img
                  onClick={changeTaskHandler}
                  className={s.setting}
                  src={setting}
                  alt="setting"
                />
                <div className={s.blockTaskTitle}>{t.title}</div>
                <div>{t.description ? t.description : "description"}</div>
              </div>
            );
          })}
        </div>
        <div className={s.column}>
          <div className={s.titleContainer}>
            <div className={`${s.circle} ${s.doing}`}></div>
            <h2 className={s.title}>doing</h2>
          </div>
          {doing.map((t) => {
            const changeTaskHandler = () => {
              setAddTaskModal(true);
            };
            return (
              <div className={s.blockTask} key={t.id}>
                <img
                  onClick={changeTaskHandler}
                  className={s.setting}
                  src={setting}
                  alt="setting"
                />
                <div className={s.blockTaskTitle}>{t.title}</div>
                <div>{t.description ? t.description : "description"}</div>
              </div>
            );
          })}
        </div>
        <div className={s.column}>
          <div className={s.titleContainer}>
            <div className={`${s.circle} ${s.done}`}></div>
            <h2 className={s.title}>done</h2>
          </div>
          {done.map((t) => {
            const changeTaskHandler = () => {
              setAddTaskModal(true);
            };
            return (
              <div className={s.blockTask} key={t.id}>
                <img
                  onClick={changeTaskHandler}
                  className={s.setting}
                  src={setting}
                  alt="setting"
                />
                <div className={s.blockTaskTitle}>{t.title}</div>
                <div>{t.description ? t.description : "description"}</div>
              </div>
            );
          })}
        </div>
        <div className={s.column}>
          <div className={s.titleContainer}>
            <div className={`${s.circle} ${s.draft}`}></div>
            <h2 className={s.title}>draft</h2>
          </div>
          {draft.map((t) => {
            const changeTaskHandler = () => {
              setAddTaskModal(true);
            };
            return (
              <div className={s.blockTask} key={t.id}>
                <img
                  onClick={changeTaskHandler}
                  className={s.setting}
                  src={setting}
                  alt="setting"
                />
                <div className={s.blockTaskTitle}>{t.title}</div>
                <div>{t.description ? t.description : "description"}</div>
              </div>
            );
          })}
        </div>
      </div>
      <EditTask
        addTaskModal={addTaskModal}
        setAddTaskModal={setAddTaskModal}
        task={currentTasks}
      />
    </div>
  );
};
