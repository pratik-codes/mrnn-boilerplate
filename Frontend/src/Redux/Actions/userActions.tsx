import { Dispatch } from "redux";
import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../Constants/user.constants";

export const LoginAction =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // hitting login api
      const { data } = await axios.post(
        "http://localhost:3000/users/signin",
        { email, password },
        config
      );
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: true,
        });
        // setting the accesstoken to the local storage
        localStorage.setItem("accessToken", data.data.accessToken);
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const RegisterAction =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // hitting login api
      const { data } = await axios.post(
        "http://localhost:3000/users/signup",
        { email, password },
        config
      );
      // only make success if the response is success
      if (data) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
