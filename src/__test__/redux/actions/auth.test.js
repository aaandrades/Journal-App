/**
 * @jest-environment node
 */
import "@testing-library/jest-dom";
import { types } from "../../../Redux/Types/types";
import {
  initLoginAction,
  loginAction,
  logoutAction,
  startLogout,
} from "../../../Redux/Actions/authActions";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { db } from "../../../firebase/firebase-config";

const initialStore = { auth: { uid: "Testing", name: "Andyman" } };
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore(initialStore);

describe("auth - Actions", () => {
  beforeEach(() => {
    store = mockStore(initialStore);
  });

  test("should login/logout should action", async () => {
    const uid = "23k4jh234";
    const displayName = "Andyman";

    const login = loginAction(uid, displayName);
    const logout = logoutAction();
    expect(login).toEqual({
      type: types.login,
      payload: { uid, displayName },
    });
    expect(logout).toEqual({ type: types.logout });
  });

  test("should start logout action", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: "[Auth] Logout" });
    expect(actions[1]).toEqual({ type: "[Notes] Logout Cleaning" });
  });

  test("should start login with email/password action", async () => {
    // Yes, just with testing purpose.
    const email = "test@testing.com";
    const password = "123456";
    const uid = "wIs7ZBCGDVeRjm6YfpQKgbqj7Si2";

    await store.dispatch(initLoginAction(email, password));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: "[UI] Enable loading" });
    expect(actions[1].payload).toEqual({ uid, displayName: null });
  });
});
