import React, { useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import s from "./Message.module.css";
import { setErrorAC } from "../../BLL/redux/app-reducer";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Message = () => {
  const dispatch = AppDispatch();
  const error = useAppSelector<string | null>((state) => state.appStatus.error);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setErrorAC(null));
  };
  return (
    <div className={s.container}>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Message;
