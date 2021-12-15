import { types } from "../types/types";

//const initialState = { events: [], activeEvent: null };

// {
//   id: new Date().getTime(),
//   title: "Cumple de Jorge",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   bgcolor: "#00a65a",
//   notes: "Comprar una tarta",
//   user: {
//     _id: '123',
//     name: "Jorge",
//   },

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

const initialState = {
  events: [],
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
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          (e) => {
            return e._id === action.payload._id ? action.payload : e;
          }
          //e.id === action.payload.id ? action.payload : e
        ),
        activeEvent: null,
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((e) => {
          return e._id !== state.activeEvent._id;
        }),
        activeEvent: null,
      };

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };
    case types.eventLogoout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
