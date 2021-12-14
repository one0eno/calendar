import { combineReducers } from "redux";
import { uiReducers } from "./uiReducers";
import { calendarReducers } from "./calendarReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  ui: uiReducers,
  calendar: calendarReducers,
  auth: authReducer,
  //TODO: agregar reducers
});
