import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function redux(state = {}, action) {
  console.log("payload", action);
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload.success };
    case AUTH_USER:
      return { ...state, userData: action.payload.success };
    default:
      return state;
  }
}
