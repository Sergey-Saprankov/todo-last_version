import React from "react";
import s from "./TaskColumn.module.css";
import setting from "../img/setting.svg";
import { TaskDataType } from "../../../api/api-types/api-types";

type TaskColumnType = {
  title: string;
  tasks: TaskDataType[];
  setTaskId: (value: string) => void;
  setAddTaskModal: (value: boolean) => void;
};

const TaskColumn: React.FC<TaskColumnType> = React.memo(
  ({ setTaskId, setAddTaskModal, tasks, title }) => {
    console.log("taskColumn");
    return (
      <div className={s.column}>
        <div className={s.titleContainer}>
          <div className={`${s.circle} ${s[title]}`} />
          <h2 className={s.title}>
            {title}({tasks.length})
          </h2>
        </div>
        {tasks.map((t) => {
          const changeTaskHandler = () => {
            setTaskId(t.id);
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
    );
  }
);

export default TaskColumn;
