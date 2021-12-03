import { types } from "../types/types";
import { combineReducers } from "redux";
import { uiReducers } from "./uiReducers";
import { calendarReducers } from "./calendarReducer";

export const rootReducer = combineReducers({
  ui: uiReducers,
  calendar: calendarReducers,
  //TODO: agregar reducers
});
