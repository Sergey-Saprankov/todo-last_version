import React from "react";
import s from "./Header.module.css";
import logo1 from "../../img/logo1.png";
import logo from "../../img/logo.svg";
import { NavLink } from "react-router-dom";

export const Header = React.memo(() => {
  console.log("header");
  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div>
          <img className={s.logo1} src={logo1} alt="logo1" />
        </div>

        <div>
          <img className={s.logo} src={logo} alt="logo" />
        </div>
      </div>
      <div className={s.headerContainer}>
        <div>Task manager</div>

        <div>
          <NavLink to={"/login"} className={s.btn}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
});
