import { documentNotReadyOrSSRTesting } from "react-modal/lib/helpers/ariaAppHider";
import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {
    console.log(event);
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();
      console.log(body);
      if (body.ok) {
        event._id = body.evento._id;
        event.user = {
          _id: uid,
          name: name,
        };

        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => {
  return {
    type: types.eventAddNew,
    payload: event,
  };
};

export const eventSetActive = (event) => {
  return {
    type: types.eventSetActive,
    payload: event,
  };
};

export const eventClearActiveEvent = () => {
  return {
    type: types.eventClearActiveEvent,
  };
};

export const startEventUpdated = (event) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`events/${event._id}`, event, "PUT");
      const body = await resp.json();
      console.log(body);
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => {
  return {
    type: types.eventUpdated,
    payload: event,
  };
};

export const startEventDeleted = () => {
  return async (dispatch, getState) => {
    const { _id } = await getState().calendar.activeEvent;

    try {
      const resp = await fetchConToken(`events/${_id}`, {}, "DELETE");
      const body = await resp.json();
      console.log(body);
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => {
  return {
    type: types.eventDeleted,
  };
};

export const eventStartLoading = () => {
  return async (distpatch, getState) => {
    try {
      const resp = await fetchConToken("events", "GET");
      const body = await resp.json();

      if (body.ok) {
        const parseEvents = prepareEvents(body.eventos);

        distpatch(eventLoaded(parseEvents));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
