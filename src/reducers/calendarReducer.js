import { types } from "../types/types";
import moment from "moment";

const initialState = {
  events: [
    {
      title: "Cumple de Jorge",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#00a65a",
      notes: "Comprar una tarta",
      user: {
        name: "Jorge",
        lastname: "Perez",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },

      // allDay:false,
      // description:"Cumpleaños de Jorge",
      // link:"https://www.google.com",
      // location:"Calle Falsa 123",
      // type:"birthday",
      // notes:"asd asf a s",
      // id:1,
      // userId:1,
      // user:{  name:"Jorge", lastName:"Perez", email:"asdf@asd.es" },
      // createdAt:moment().toDate(),
    },
  ],
  activeEvent: null,
};

export const calendarReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        events: [...state.events],
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
};
