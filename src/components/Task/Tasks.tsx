import React, { useState } from "react";
import { useAppSelector } from "../../BLL/redux/store";
import { TaskStateType } from "../../BLL/redux/redux-type/redux-type";
import s from "./Tasks.module.css";
import TaskColumn from "./TaskColumn/TaskColumn";

type TaskType = {
  todoListId: string;
};

export const Tasks: React.FC<TaskType> = React.memo(({ todoListId }) => {
  console.log("task");
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
        <TaskColumn title={"todo"} tasks={todo} />
        <TaskColumn title={"doing"} tasks={doing} />

        <TaskColumn title={"done"} tasks={done} />
        <TaskColumn title={"draft"} tasks={draft} />
      </div>
    </div>
  );
});
