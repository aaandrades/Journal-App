/**
 * @jest-environment node
 */
import React from "react";
import { mount } from "enzyme";
import "jsdom-global/register";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  initLoginAction,
  startGoogleLoginAction,
} from "../../../Redux/Actions/authActions";

jest.mock("../../../Redux/Actions/authActions", () => ({
  startGoogleLoginAction: jest.fn(),
  initLoginAction: jest.fn(),
}));

const initialStore = {
  auth: { uid: "Testing", name: "Andyman" },
  ui: { loading: false, msgError: null },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore(initialStore);
store.dispatch = jest.fn();

describe("LoginScreen - Component", () => {
  beforeEach(() => {
    store = mockStore(initialStore);
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  test("should match to snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispath login action with google", () => {
    wrapper.find(".google-btn").prop("onClick")();
    expect(startGoogleLoginAction).toHaveBeenCalled();
  });

  test("should dispath login with email/password", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(initLoginAction).toHaveBeenCalled();
  });
});
