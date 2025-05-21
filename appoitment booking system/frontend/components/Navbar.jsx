import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userImg from '../src/assets/user.jpg'

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showMenu, setShowmenu] = useState(false);

  const handleViewAppointment = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/appointments");
      if (!response.ok) {
        alert("No appointments found.");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("User's Appointments:", data);
      if (data.length > 0) {
        const appointmentId = data[0]._id;
        localStorage.setItem("appointmentId", appointmentId);
        navigate(`/my-appointments/${appointmentId}`, { state: { appointments: data } });
      } else {
        navigate(`/my-appointments`, { state: { appointments: [] } });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-blue-50 border-b-1 border-blue-400">
      <h1 onClick={() => navigate("/")} className="text-2xl font-bold text-black cursor-pointer">
      MediLink
      </h1>
      <ul className="flex gap-6 text-black">
        <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold text-black" : "hover:text-gray-700"}>HOME</NavLink>
        <NavLink to="/allDoctors" className={({ isActive }) => isActive ? "font-semibold text-black" : "hover:text-gray-700"}>ALL DOCTORS</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "font-semibold text-black" : "hover:text-gray-700"}>ABOUT US</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "font-semibold text-black" : "hover:text-gray-700"}>CONTACT US</NavLink>
      </ul>
      {token ? (
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={() => setShowmenu(!showMenu)}>
            <img className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold" 
              src = {userImg }
            />
            <i className="ri-arrow-drop-down-line text-lg ml-2"></i>
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 p-3">
              <p onClick={() => navigate("/my-profile")} className="cursor-pointer hover:text-gray-700 hover:font-bold">My Profile</p>
              <p onClick={handleViewAppointment} className="cursor-pointer hover:text-gray-700 hover:font-bold">My Appointments</p>
              <p onClick={handleLogout} className="cursor-pointer text-red-500 hover:font-semibold">Log Out</p>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 shadow-md">
          Log in
        </button>
      )}
    </nav>
  );
}

export default Navbar;
