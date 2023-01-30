import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Todolist } from "../Todolist/Todolist";
import Login from "../Login/Login";

export const Main = React.memo(() => {
  console.log("main");
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/todolist" element={<Todolist />} />
      <Route path={"todolist/:id"} element={<Todolist />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/404"} element={<div>Error</div>} />
      <Route path={"/*"} element={<Navigate to={"/404"} />} />
      <Route path={"todolist/:id/*"} element={<Navigate to={"/404"} />} />
    </Routes>
  );
});
