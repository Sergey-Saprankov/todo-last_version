import React, { useState } from "react";
import s from "./TaskColumn.module.css";
import setting from "../img/setting.svg";
import { TaskDataType } from "../../../api/api-types/api-types";
import { EditTask } from "../../EditTask/EditTask";
import { AppDispatch, useAppSelector } from "../../../BLL/redux/store";
import { setModalStatusAC } from "../../../BLL/redux/app-reducer";

type TaskColumnType = {
  title: string;
  tasks: TaskDataType[];
};

const TaskColumn: React.FC<TaskColumnType> = React.memo(({ tasks, title }) => {
  console.log("column");
  const [taskId, setTaskId] = useState("");
  const [task] = tasks.filter((t) => t.id === taskId);
  const isOpen = useAppSelector(
    (state) => state.appStatus.editTaskModal.isOpen
  );
  const dispatch = AppDispatch();

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
          console.log(t.id);
          setTaskId(t.id);
          dispatch(setModalStatusAC(true, "editTaskModal"));
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
      {isOpen && task && <EditTask task={task} />}
    </div>
  );
});

export default TaskColumn;
