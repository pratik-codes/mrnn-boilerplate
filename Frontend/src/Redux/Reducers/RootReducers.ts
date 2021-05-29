import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./userReducers";

const RootReducer = combineReducers({
  userInfo: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default RootReducer;
