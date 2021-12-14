import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../ui/NavBar";
import { messages } from "../../helpers/caledar-messages-es";
import { useDispatch, useSelector } from "react-redux";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";

import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment); // or globalizeLocalizer;

// const events = [
//   {
//     title: "Cumple de Jorge",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#00a65a",
//     notes: "Comprar una tarta",
//     user: {
//       name: "Jorge",
//       lastname: "Perez",
//       avatar:
//         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
//     },

//     // allDay:false,
//     // description:"Cumpleaños de Jorge",
//     // link:"https://www.google.com",
//     // location:"Calle Falsa 123",
//     // type:"birthday",
//     // notes:"asd asf a s",
//     // id:1,
//     // userId:1,
//     // user:{  name:"Jorge", lastName:"Perez", email:"asdf@asd.es" },
//     // createdAt:moment().toDate(),
//   },
// ];

export default function CalendarScreen() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);
  const { activeEvent } = useSelector((state) => state.calendar);
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    //dispatch(uiOpenModal());
  };

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    //var backgroundColor = event.bgcolor;
    var style = {
      backgroundColor: "#367CF7" /*backgroundColor*/,
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
      border: "0px",
    };
    return {
      style: style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        title="Calendario"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView || "month"}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
      />
      {activeEvent && <DeleteEventFab />}

      <AddNewFab />
      <CalendarModal />
    </div>
  );
}
