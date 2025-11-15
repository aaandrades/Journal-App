import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import lottie from "lottie-web";
import login from "../assets/lottie/login.json";

export const AuthRouter = () => {
  const refContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: refContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: login,
    });
  }, []);

  return (
    <div className="auth__main">
      <div className="auth__box-announcement">
        <span className="auth__box-announcement__bio">Made with ❤️ by Andres</span>
        <span className="auth__box-announcement__title">
          Write in your Journal,
          <br /> not in your hand
        </span>
        <div
          className="auth__box-announcement__lottie"
          ref={refContainer}
        ></div>
      </div>
      <div className="auth__box-container">
        <Routes>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </div>
    </div>
  );
};
