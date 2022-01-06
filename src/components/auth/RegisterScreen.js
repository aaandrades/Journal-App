import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { RegisterState } from "../../states/InitialStates";
import {
  setErrorAction,
  setRemoveErrorAction,
} from "../../Redux/Actions/uiActions";
import { initRegisterAction } from "../../Redux/Actions/authActions";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [values, handleInputChange] = useForm(RegisterState);
  const { name, email, password, password2 } = values;

  const handleRegister = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(initRegisterAction(name, email, password));
    }
  };

  const validateForm = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

    if (name.trim().length === 0) {
      dispatch(setErrorAction("Name must be required"));
      return false;
    } else if (!emailRegex.test(email)) {
      dispatch(setErrorAction("Email its incorrect"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setErrorAction(
          "Password should be at least 6 characters and match each other"
        )
      );
      return false;
    }
    dispatch(setRemoveErrorAction());
    return true;
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster register-container login-container">
      <div className="login-container__header">
        <h3 className="login-container__header__title">Register</h3>
        <label className="login-container__header__subheader">
          Create a free acount to use the app!
        </label>
      </div>
      <form type="submit" onSubmit={handleRegister}>
        <div className="headers">
          {msgError && <div className="auth__alert-error mb-5">{msgError}</div>}
          <div className="textfield-container">
            <label>
              Name<b> *</b>
            </label>
            <input
              type="text"
              value={values.name}
              className="input-container"
              placeholder="Andrés Andrade"
              name="name"
              autoComplete="new-password"
              onChange={handleInputChange}
            />
          </div>
          <div className="textfield-container">
            <label>
              Email<b> *</b>
            </label>
            <input
              type="email"
              value={values.email}
              className="input-container"
              placeholder="aaandrades@mail.com"
              name="email"
              autoComplete="new-password"
              onChange={handleInputChange}
            />
          </div>
          <div className="textfield-container">
            <label>
              Password<b> *</b>
            </label>
            <input
              type="password"
              value={values.password}
              className="input-container"
              name="password"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <div className="textfield-container">
            <label>
              Confirm password<b> *</b>
            </label>
            <input
              type="password"
              value={values.password2}
              className="input-container"
              name="password2"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="auth-btn pointer"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="footers">
          <label className="paragraph">
            <span>Already registered ?</span>
            <Link to="/auth/login" className="link">
              Sign in
            </Link>
          </label>
        </div>
      </form>
    </div>
  );
};
