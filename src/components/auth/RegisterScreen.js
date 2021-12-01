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
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="mb-5">Register</h3>
      <form type="submit" onSubmit={handleRegister}>
        <div className="headers">
          {msgError && <div className="auth__alert-error mb-5">{msgError}</div>}
          <input
            type="text"
            value={values.name}
            className="input-container"
            placeholder="Name"
            name="name"
            autoComplete="new-password"
            onChange={handleInputChange}
          />
          <input
            type="email"
            value={values.email}
            className="input-container"
            placeholder="Email"
            name="email"
            autoComplete="new-password"
            onChange={handleInputChange}
          />
          <input
            type="password"
            value={values.password}
            className="input-container"
            placeholder="Password"
            name="password"
            autoComplete="off"
            onChange={handleInputChange}
          />
          <input
            type="password"
            value={values.password2}
            className="input-container"
            placeholder="Confirm password"
            name="password2"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="button pointer"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="footers">
          <span className="paragraph">
            <Link to="/auth/login" className="link">
              Already registered?
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
