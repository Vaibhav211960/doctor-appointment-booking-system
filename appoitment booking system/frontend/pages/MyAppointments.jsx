import React, { useEffect, useState } from "react";
import axios from "axios";
import bgApp from "../src/assets/appBg.png";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointments/myAppoint",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setAppointments(response.data || []);
      } catch (err) {
        setError("Failed to fetch your appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/appointments/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments(
        appointments.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (appointments.length === 0)
    return <p className="text-center text-gray-500">No appointments found.</p>;

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-blue-50">
      {/* Background Image */}
      <div className="absolute inset-0 bg-blue-300">
        <img
          src={bgApp}
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 text-red-500 text-3xl font-bold hover:text-red-700 cursor-pointer"
      >
        ❌
      </button>

      <div className="relative max-w-3xl w-full p-8 bg-blue-100 shadow-2xl rounded-2xl border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          My Appointments
        </h2>
        <ul className="space-y-6">
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="p-6 bg-blue-50 rounded-xl shadow-md border border-gray-300 hover:shadow-xl transition flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Doctor:{" "}
                  <span className="text-gray-600">
                    {`${appointment.doctor?.name} (${appointment.doctor?.specialization})` ||
                      "Unknown Doctor"}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Patient:{" "}
                  <span className="text-gray-600">
                    {appointment.user?.username || "Unknown Patient"}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Date:{" "}
                  <span className="text-gray-600">
                    {appointment.date
                      ? new Date(appointment.date).toISOString().split("T")[0]
                      : "Unknown Date"}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Time:{" "}
                  <span className="text-gray-600">
                    {appointment.timeSlot || "N/A"}
                  </span>
                </p>
                <p
                  className={`text-lg font-semibold ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {appointment.status}
                </p>
              </div>
              <button
                onClick={() => handleCancelAppointment(appointment._id)}
                className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyAppointments;
