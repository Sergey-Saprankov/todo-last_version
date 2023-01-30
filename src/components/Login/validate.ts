type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const validate = (values: FormikErrorType) => {
  const errors: FormikErrorType = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password) &&
    values.password !== "free"
  ) {
    errors.password = "Invalid password";
  }

  return errors;
};
