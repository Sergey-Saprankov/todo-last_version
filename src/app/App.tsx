import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AppDispatch, useAppSelector } from "../BLL/redux/store";
import { getTodosTC } from "../BLL/redux/todolist-reducer";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { AddNewTodo } from "../components/AddNewBoard/AddNewTodo";
import Login from "../components/Login/Login";
import { meTC } from "../BLL/redux/auth-reducer";
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = AppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(meTC());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    dispatch(getTodosTC());
  }, []);

  return (
    <div className={"container"}>
      <Header />
      <Main />
      {isLoggedIn && <Sidebar />}
      <AddNewTodo />
    </div>
  );
}

export default App;
