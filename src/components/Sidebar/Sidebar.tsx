import React from "react";
import s from "./Sidebar.module.css";
import logo1 from "../../img/logo1.png";
import logo from "../../img/logo.svg";
import board from "../../img/board.svg";
import { FormControlLabel, Switch } from "@mui/material";
import light from "../../img/light.svg";
import dark from "../../img/dark.svg";
import hide from "../../img/hide.svg";
import visibleImg from "../../img/visible.svg";
import { useSelector } from "react-redux";
import {
  StoreType,
  TodoEntityType,
} from "../../BLL/redux/redux-type/redux-type";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../BLL/redux/store";

type SidebarType = {
  callBack: (value: boolean) => void;
  visible: boolean;
  modalTodo: boolean;
  setModalTodo: (value: boolean) => void;
};

export const Sidebar: React.FC<SidebarType> = ({
  callBack,
  visible,
  modalTodo,
  setModalTodo,
}) => {
  const todoLists = useAppSelector<TodoEntityType[]>(
    (state) => state.todoListData
  );

  // const dispatch = useDispatch();

  const addTodoHandler = () => {
    setModalTodo(!modalTodo);
  };

  const todoListsMap = todoLists?.map((t) => {
    return (
      <NavLink
        className={({ isActive }) => (isActive ? s.active : "")}
        key={t.id}
        to={`/todolist/${t.id}`}
      >
        <li className={s.item}>
          <div className={s.boardIconContainer}>
            <img className={s.boardIcon} src={board} alt="board-icon" />
          </div>

          <div className={s.boardTitle}>{t.title}</div>
        </li>
      </NavLink>
    );
  });

  const sidebarHide = visible ? s.visible : s.notVisible;
  return (
    <div className={`${s.container} ${sidebarHide}`}>
      <div className={s.wrapper}>
        <div className={s.logoContainer}>
          <div>
            <img className={s.logo1} src={logo1} alt="logo1" />
          </div>

          <div>
            <img className={s.logo} src={logo} alt="logo" />
          </div>
        </div>

        <div className={s.boardContainer}>
          <div className={s.boardCount}>all Todolist ({todoLists.length})</div>

          <ul className={s.items}>
            {todoListsMap}

            <li className={s.addBoardItem}>
              <div className={s.boardIconContainer}>
                <img className={s.boardIcon} src={board} alt="board-icon" />
              </div>

              <div onClick={addTodoHandler} className={s.addBoardTitle}>
                + Create New To-do List
              </div>
            </li>
          </ul>
        </div>

        <div className={s.footerContainer}>
          <div className={s.footerSidebar}>
            <div className={s.themeContainer}>
              <div className={s.lightTheme}>
                <img src={light} alt="light-theme" />
              </div>
              <div className={s.checkBoxContainer}>
                <FormControlLabel
                  sx={{
                    margin: "0",
                    "& .MuiSwitch-switchBase": {
                      color: "#fff",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#635FC7",
                    },
                  }}
                  control={<Switch sx={{ color: "#fff" }} defaultChecked />}
                  label=""
                />
              </div>
              <div className={s.darkTheme}>
                <img src={dark} alt="dark-theme" />
              </div>
            </div>

            <div onClick={() => callBack(false)} className={s.visibleContainer}>
              <div className={s.hideImgContainer}>
                <img src={hide} alt="hide" />
              </div>

              <div>Hide Sidebar</div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => callBack(true)}
        className={visible ? s.hide : `${s.hide} ${s.onVisible}`}
      >
        <img src={visibleImg} alt="eye" />
      </div>
    </div>
  );
};
