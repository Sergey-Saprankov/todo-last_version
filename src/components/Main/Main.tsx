import React from "react";
import { Route, Routes } from "react-router-dom";
import { Todolist } from "../Todolist/Todolist";

type MainType = {
  visible: boolean;
};

export const Main: React.FC<MainType> = React.memo(({ visible }) => {
  console.log("main");
  return (
    <Routes>
      <Route path="/todolist" element={<Todolist visible={visible} />} />
      <Route path={"todolist/:id"} element={<Todolist visible={visible} />} />
    </Routes>
  );
});
