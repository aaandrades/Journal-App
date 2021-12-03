import { authReducer } from "../../../Redux/Reducers/authReducer";
import { types } from "../../../Redux/Types/types";

describe("authReducer - Reducer", () => {
  test("should do login action", () => {
    const loginAction = {
      type: types.login,
      payload: { uid: "123", displayName: "aaandrades" },
    };
    const store = authReducer({}, loginAction);
    expect(store).toEqual({ uid: "123", name: "aaandrades" });
  });

  test("should do logout action", () => {
    const initialState = {
        uid: '123123kj1h23',
        name: 'aaandrades'
    }
    const logoutAction = { type: types.logout };
    const store = authReducer(initialState, logoutAction);
    expect(store).toEqual({});
  });

  test("should return same state", () => {
    const emptyAction = {
      type: 'empty',
    };
    const store = authReducer(undefined, emptyAction);
    expect(store).toEqual({});
  });
});
