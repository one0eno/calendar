import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginScreen from "../Components/auth/LoginScreen";
import CalendarScreen from "../Components/calendar/CalendarScreen";
import Loading from "../Components/ui/Loading";

export default function AppRouter() {
  const { checking, uid } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }

  const isAuthenticate = !!uid ? true : false;

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticate ? <Navigate to="/calendar" /> : <LoginScreen />
            }
          />
          <Route
            path="/calendar"
            element={
              isAuthenticate ? <CalendarScreen /> : <Navigate to="/login" />
            }
          />
          <Route path="/*" element={<Navigate to="/login" />} /> *
        </Routes>
      </Router>
    </div>
  );
}
