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
import { AppRouter } from "../../../routers/AppRouter";
import { act } from "@testing-library/react";
import { firebase } from "../../../firebase/firebase-config";

jest.mock("../../../Redux/Actions/authActions", () => ({
  loginAction: jest.fn(),
}));

jest.mock("lottie-web");

const initialStore = {
  auth: {},
  ui: { loading: false, msgError: null },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore(initialStore);

describe.skip("AppRouter - Router", () => {
  xtest("should dispatch login if the user is login", async () => {
    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("test@testing.com", "123456");

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
