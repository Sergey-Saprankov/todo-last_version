import React from "react";
import s from "./Login.module.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { validate } from "./validate";
import { AppDispatch, useAppSelector } from "../../BLL/redux/store";
import { loginTC } from "../../BLL/redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = AppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate,
    onSubmit: (values) => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to={"/todolist"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid style={{ background: "#fff" }} item justifyContent={"center"}>
        <FormControl>
          <FormLabel style={{ background: "#fff" }}>
            <p>
              To log in get registered
              <a
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
              >
                {" "}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={s.error}>{formik.errors.email}</div>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={s.error}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                checked={formik.values.rememberMe}
                {...formik.getFieldProps("rememberMe")}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                disabled={Object.keys(formik.errors).length > 0}
              >
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Login;
