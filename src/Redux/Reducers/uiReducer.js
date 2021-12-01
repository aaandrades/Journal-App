import { UIState } from "../../states/InitialStates";
import { types } from "../Types/types";

export const uiReducer = (state = UIState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };
    case types.enableLoading:
      return {
        ...state,
        loading: true,
      };
    case types.disableLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
