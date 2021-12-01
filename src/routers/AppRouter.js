import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { firebase } from "../Firebase/firebase-config";
import { useDispatch } from "react-redux";

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { loginAction } from "../Redux/Actions/authActions";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import "../styles/styles.scss";
import { fetchNotes } from "../Redux/Actions/notesActions";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(loginAction(user.uid, user.displayName));
        dispatch(fetchNotes(user.uid));
        setIsLoggedIn(true);
      }
      setChecking(false);
    });
  }, [dispatch]);

  return !checking ? (
    <BrowserRouter>
      <Routes>
        <Route
          path="auth/*"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  ) : null;
};
