import { ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../Constants/user.constants";
export interface userBasicState {
  user: boolean;
}
const userInitialBasicState: userBasicState = {
  user: false,
};
type Action = {
  type: string;
  payload?: boolean;
};
export const userLoginReducer = (
  state = userInitialBasicState,
  action: Action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = userInitialBasicState,
  action: Action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
