import React, { useState } from "react";
import { useAppSelector } from "../../BLL/redux/store";
import { TaskStateType } from "../../BLL/redux/redux-type/redux-type";
import s from "./Tasks.module.css";
import setting from "./img/setting.svg";
import { EditTask } from "../EditTask/EditTask";
import TaskColumn from "./TaskColumn/TaskColumn";

type TaskType = {
  todoListId: string;
};

export const Tasks: React.FC<TaskType> = ({ todoListId }) => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [taskId, setTaskId] = useState("");
  const tasks = useAppSelector<TaskStateType>((state) => state.tasksListData);

  const currentTasks = tasks[todoListId];

  if (!currentTasks) return null;

  const [task] = taskId ? currentTasks.filter((t) => t.id === taskId) : [];

  const todo = currentTasks?.filter((t) => t.status === 0);
  const doing = currentTasks?.filter((t) => t.status === 1);
  const done = currentTasks?.filter((t) => t.status === 2);
  const draft = currentTasks?.filter((t) => t.status === 3);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <TaskColumn
          title={"todo"}
          tasks={todo}
          setTaskId={setTaskId}
          setAddTaskModal={setAddTaskModal}
        />
        <TaskColumn
          title={"doing"}
          tasks={doing}
          setTaskId={setTaskId}
          setAddTaskModal={setAddTaskModal}
        />

        <TaskColumn
          title={"done"}
          tasks={done}
          setTaskId={setTaskId}
          setAddTaskModal={setAddTaskModal}
        />
        <TaskColumn
          title={"draft"}
          tasks={draft}
          setTaskId={setTaskId}
          setAddTaskModal={setAddTaskModal}
        />
      </div>
      {addTaskModal && (
        <EditTask
          addTaskModal={addTaskModal}
          setAddTaskModal={setAddTaskModal}
          task={task}
        />
      )}
    </div>
  );
};
