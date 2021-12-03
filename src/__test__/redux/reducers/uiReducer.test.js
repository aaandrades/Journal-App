import { uiReducer } from "../../../Redux/Reducers/uiReducer";
import { types } from "../../../Redux/Types/types";
import { UIState } from "../../../states/InitialStates";

describe("uiReducer - Reducer", () => {
  test("should set new error", () => {
    const setErrorAction = {
      type: types.uiSetError,
      payload: "error test",
    };
    const store = uiReducer(UIState, setErrorAction);
    expect(store).toEqual({ loading: false, msgError: "error test" });
  });

  test("should remove error", () => {
    const removeErrorAction = { type: types.uiRemoveError };
    const store = uiReducer(UIState, removeErrorAction);
    expect(store).toEqual({ loading: false, msgError: null });
  });

  test("should enable loading", () => {
    const enableLoadingAction = { type: types.enableLoading };
    const store = uiReducer(UIState, enableLoadingAction);
    expect(store).toEqual({ loading: true, msgError: null });
  });

  test("should disable loading", () => {
    const disableLoadingAction = { type: types.disableLoading };
    const store = uiReducer(UIState, disableLoadingAction);
    expect(store).toEqual({ loading: false, msgError: null });
  });

  test("should return same state", () => {
    const emptyAction = {
      type: "empty",
    };
    const store = uiReducer(undefined, emptyAction);
    expect(store).toEqual(UIState);
  });
});
