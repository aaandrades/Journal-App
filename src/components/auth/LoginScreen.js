import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { initLoginAction, startGoogleLoginAction } from "../../Redux/Actions/authActions";
import { LoginState } from "../../states/InitialStates";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);
  
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
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="mb-5">Login</h3>
      <form type="submit" onSubmit={handleLogin}>
        <div className="headers">
          <input
            type="email"
            className="input-container"
            placeholder="Email"
            name="email"
            autoComplete="new-password"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="input-container"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="button btn pointer"
            disabled={loading}
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </div>
        <hr></hr>
        <div className="footers">
          <div className="google-btn" onClick={() => handleGoogleLogin()}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Login with Google</b>
            </p>
          </div>
          <span className="paragraph">Or</span>
          <span className="paragraph">
            <Link to="/auth/register" className="link">
              Create new account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
