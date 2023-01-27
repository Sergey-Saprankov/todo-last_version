import React from "react";
import { Route, Routes } from "react-router-dom";
import { Todolist } from "../Todolist/Todolist";

export const Main = React.memo(() => {
  return (
    <Routes>
      <Route path="/todolist" element={<Todolist />} />
      <Route path={"todolist/:id"} element={<Todolist />} />
    </Routes>
  );
});
