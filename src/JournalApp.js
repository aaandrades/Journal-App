import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import { AppRouter } from "./routers/AppRouter";
import "./styles/styles.scss";

export const JournalApp = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
  