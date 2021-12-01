import { types } from "../Types/types";

export const setErrorAction = (message) => ({
  type: types.uiSetError,
  payload: message,
});

export const setRemoveErrorAction = () => ({
  type: types.uiRemoveError,
});

export const enableLoadingAction = () => ({
  type: types.enableLoading,
});

export const disableLoadingAction = () => ({
  type: types.disableLoading,
});
