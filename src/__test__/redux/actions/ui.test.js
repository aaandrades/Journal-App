import {
  disableLoadingAction,
  enableLoadingAction,
  setErrorAction,
  setRemoveErrorAction,
} from "../../../Redux/Actions/uiActions";
import { types } from "../../../Redux/Types/types";

describe("ui - Actions", () => {
  test("should load actions sync", () => {
    const action = setErrorAction("new error set");
    expect(action).toEqual({
      type: types.uiSetError,
      payload: "new error set",
    });

    const setRemoveError = setRemoveErrorAction();
    expect(setRemoveError).toEqual({ type: types.uiRemoveError });

    const enableLoading = enableLoadingAction();
    expect(enableLoading).toEqual({ type: types.enableLoading });

    const disableLoading = disableLoadingAction();
    expect(disableLoading).toEqual({ type: types.disableLoading });
  });
});
