import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AppDispatch, useAppSelector } from "../BLL/redux/store";
import { getTodosTC } from "../BLL/redux/todolist-reducer";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { AddNewTodo } from "../components/AddNewBoard/AddNewTodo";

function App() {
  const dispatch = AppDispatch();
  const [visible, setVisible] = useState(true);
  const [modalTodo, setModalTodo] = useState(false);

  const setModalTodoCallBack = useCallback(setModalTodo, []);
  const setVisibleTodoCallBack = useCallback(setVisible, []);

  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  return (
    <div className={"container"}>
      <Header />
      <Main visible={visible} />
      <Sidebar
        callBack={setVisibleTodoCallBack}
        visible={visible}
        modalTodo={modalTodo}
        setModalTodo={setModalTodoCallBack}
      />
      <AddNewTodo modalTodo={modalTodo} setModalTodo={setModalTodoCallBack} />
    </div>
  );
}

export default App;
