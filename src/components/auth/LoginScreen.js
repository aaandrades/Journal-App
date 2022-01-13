import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  initLoginAction,
  startGoogleLoginAction,
} from "../../Redux/Actions/authActions";
import { LoginState } from "../../states/InitialStates";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm(LoginState);
  const { email, password } = values;

  const handleLogin = (ev) => {
    ev.preventDefault();
    dispatch(initLoginAction(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLoginAction());
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster login-container">
      <div className="login-container__header">
        <h3 className="login-container__header__title">Login</h3>
        <label className="login-container__header__subheader">
          Save your daily experiences and track your growth!
        </label>
      </div>
      <button className="auth-google" onClick={() => handleGoogleLogin()}>
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="google button"
        />
        <b>Sign in with Google</b>
      </button>
      <div className="auth-separator">
        <span>or Sign with Email</span>
      </div>
      <form type="submit" onSubmit={handleLogin}>
        <div className="headers">
          <div className="textfield-container">
            <label>
              Email<b> *</b>
            </label>
            <input
              type="email"
              className="input-container"
              placeholder="Email"
              name="email"
              autoComplete="new-password"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="textfield-container">
            <label>
              Password<b> *</b>
            </label>
            <input
              type="password"
              className="input-container"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="auth-btn pointer"
            disabled={loading}
            onClick={(e) => handleLogin(e)}
          >
            <b>Login</b>
          </button>
        </div>
        <div className="footers">
          <label className="paragraph">
            <span>Not registered yet?</span>
            <Link to="/auth/register" className="link">
              Create an Account
            </Link>
          </label>
        </div>
      </form>
    </div>
  );
};
