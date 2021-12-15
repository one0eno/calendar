import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const data = {
      email: email,
      password: password,
    };
    const resp = await fetchSinToken("auth", data, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      console.log(body);
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { name: name, email: email, password: password },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      console.log("EL TOKEN..........", body.token);
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const startLogOut = () => {
  return (dispatch) => {
    localStorage.clear("token");
    dispatch(eventLogout());
    dispatch(logOut());
  };
};

const eventLogout = () => ({ type: types.eventLogoout });

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const logOut = () => ({
  type: types.authLogout,
});
/**
 * Se llama tanto por login como starRegister
 */
const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
