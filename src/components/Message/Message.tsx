import React from "react";
import s from "./Message.module.css";
import { Alert, Button, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import { setErrorAC } from "../../BLL/redux/app-reducer";

const Message = () => {
  const dispatch = AppDispatch();
  const error = useAppSelector<string | null>((state) => state.appStatus.error);
  const onCloseHandler = () => {
    dispatch(setErrorAC(null));
  };
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Alert
          onClick={onCloseHandler}
          action={<CloseIcon />}
          variant={"filled"}
          severity="error"
        >
          {error}
        </Alert>
      </div>
    </div>
  );
};

export default Message;
