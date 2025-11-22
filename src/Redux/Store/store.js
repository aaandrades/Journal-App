import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../Reducers/authReducer";
import { notesReducer } from "../Reducers/notesReducer";
import { uiReducer } from "../Reducers/uiReducer";

/**
 * Use redux devtools with Redux-thunk to async actions
 */
const composeEnhancers =
  (import.meta.env.DEV &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/**
 * Create a merge reducers to import all at once
 */
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
});

/**
 * Create the store with all reducers
 */
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
