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
  console.log("app");
  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  return (
    <div className={"container"}>
      <Header />
      <Main />
      <Sidebar />
      <AddNewTodo />
    </div>
  );
}

export default App;
