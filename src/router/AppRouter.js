import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "../Components/auth/LoginScreen";
import CalendarScreen from "../Components/calendar/CalendarScreen";

export default function AppRouter(){

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/"  element={<LoginScreen />} />
                    <Route path="calendar" element={<CalendarScreen />} />
                    <Route path="/*" element={<Navigate  to="/" />} />
                </Routes>
            </Router>
            {/*
                exact /login => loginScreen
                exact calendar =>CalendarScreen

            */}
        </div>
    );
}