/**
 * @jest-environment node
 */
import React from "react";
import { mount } from "enzyme";
import "jsdom-global/register";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";

jest.mock("../../../Redux/Actions/authActions", () => ({
  initRegisterAction: jest.fn(),
}));

const initialStore = {
  auth: {},
  ui: { loading: false, msgError: null },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore(initialStore);
store.dispatch = jest.fn();

describe("RegisterScreen - Component", () => {
  beforeEach(() => {
    store = mockStore(initialStore);
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>
  );

  test("should match to snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch register action", () => {
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate("change", {
      target: {
        value: "",
        email: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    store.getActions();
  });
});
