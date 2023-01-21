import React from "react";
import s from "./Header.module.css";
import logo1 from "../../img/logo1.png";
import logo from "../../img/logo.svg";

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
          <button className={s.btn}>Login</button>
        </div>
      </div>
    </div>
  );
});
