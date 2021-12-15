import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  startEventAddNew,
  startEventUpdated,
  eventClearActiveEvent,
} from "../../actions/events";

import "../../styles.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowAddOneHour = now.clone().add(1, "hours");

const initEvent = {
  start: now.toDate(),
  end: nowAddOneHour.toDate(),
  title: "",
  notes: "",
};

export default function CalendarModal() {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());

  const [dateEnd, setDateEnd] = useState(nowAddOneHour.toDate());

  const [formValue, setformValue] = useState(initEvent);

  const [titleValid, setTitleValid] = useState(true);

  useEffect(() => {
    if (activeEvent) {
      setformValue(activeEvent);
      setDateStart(activeEvent.start);
      setDateEnd(activeEvent.end);
    } else {
      setformValue(initEvent);
    }
  }, [activeEvent, setformValue]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setformValue(initEvent);
  };

  const handleStartDateChange = (date) => {
    setDateStart(date);
    setformValue({
      ...formValue,
      start: date,
    });
  };

  const handleEndDateChange = (date) => {
    setDateEnd(date);
    setformValue({
      ...formValue,
      end: date,
    });
  };

  const { title, notes } = formValue;

  const handleInputChange = ({ target }) => {
    //e.preventDefault();
    setformValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(dateStart);
    const momentEnd = moment(dateEnd);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire("Error", "La fecha de inicio debe ser menor a la fecha de fin");
      return;
    }
    if (title.trim().length < 2) {
      Swal.fire("Error", "El titulo no puede estar vacio");
      setTitleValid(false);
      return;
    }

    console.log(formValue);

    //Creamos nuevo
    if (activeEvent) {
      dispatch(startEventUpdated(formValue));
    } else {
      dispatch(startEventAddNew(formValue));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      contentLabel="..."
    >
      {activeEvent ? <h1> {activeEvent.title} </h1> : <h1> Nuevo evento </h1>}

      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
            name="start"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
            name="end"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleValid ? "" : "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
}
