import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AllDoctors from "../pages/AllDocs";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import MyProfile from "../pages/MyProfile";
import MyAppointments from "../pages/MyAppointments";
import AppointmentForm from "../components/AppointmentForm"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/allDoctors" element={<AllDoctors />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments/:id" element={<MyAppointments />} />
          <Route path="/make-appointment" element={<AppointmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
