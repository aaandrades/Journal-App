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
import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../Redux/Actions/authActions";
import { createNoteAction } from "../../../Redux/Actions/notesActions";

jest.mock("../../../Redux/Actions/authActions", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../Redux/Actions/notesActions", () => ({
  createNoteAction: jest.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const initialStore = {
  auth: { uid: "Testing", name: "Andyman" },
  notes: {
    notes: [],
    active: null,
  },
  ui: { loading: false, msgError: null },
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore(initialStore);
store.dispatch = jest.fn();

describe("Sidebar - Component", () => {
  beforeEach(() => {
    store = mockStore(initialStore);
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>
  );

  test("should match to snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch startLogout action", () => {
    wrapper.find(".btn").simulate("click");
    expect(startLogout).toHaveBeenCalled();
  });

  test("should dispatch startCreateNewNote action", () => {
    wrapper.find(".journal__new-entry__add").simulate("click");
    expect(createNoteAction).toHaveBeenCalled();
  });
});
