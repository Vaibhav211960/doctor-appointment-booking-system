import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Images
import bookImg from '../src/assets/book-removebg2.png';
import doc2 from "../src/assets/doc2-removebg.png";
import doc3 from "../src/assets/doc3-removebg.png";
import doc4 from "../src/assets/doc4-removebg.png";
import doc5 from "../src/assets/doc5-removebg.png";
import doc6 from "../src/assets/doc6-removebg.png";
import doc7 from "../src/assets/doc7-removebg.png";
import doc8 from "../src/assets/doc8-removebg.png";

// Doctor image map
const doctorImages = {
  "doc2.png": doc2,
  "doc3.png": doc3,
  "doc4.png": doc4,
  "doc5.png": doc5,
  "doc6.png": doc6,
  "doc7.png": doc7,
  "doc8.png": doc8,
};

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    user: "",
    doctor: "",
    date: "",
    timeSlot: "",
    reason: "",
    status: "pending",
  });

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id;
      setFormData((prevData) => ({ ...prevData, user: userId }));
      setUser(userId);
    } else {
      alert('Please log in before booking an appointment.');
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/doctors")
      .then(response => {
        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else {
          console.error("Unexpected data format for doctors:", response.data);
        }
      })
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    if (formData.doctor && formData.date) {
      axios.get(`http://localhost:3000/api/appointments/available-slots?doctorId=${formData.doctor}&date=${formData.date}`)
        .then(response => {
          if (Array.isArray(response.data.availableSlots)) {
            setAvailableSlots(response.data.availableSlots);
          } else {
            console.error("Unexpected data format for available slots:", response.data);
          }
        })
        .catch(error => console.error("Error fetching available slots:", error));
    }
  }, [formData.doctor, formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/appointments/make", formData);
      alert("Appointment booked successfully!");
      navigate(`/my-appointments/${user}`);
    } catch (error) {
      console.error("Booking error:", error.response);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Get selected doctor and image
  const selectedDoctor = doctors.find(doc => doc._id === formData.doctor);
  const selectedDoctorImage = selectedDoctor ? doctorImages[selectedDoctor.image] : null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="flex w-[80%] bg-white shadow-lg rounded-xl p-6 overflow-hidden">
        <div className="w-1/2 md:flex items-center justify-center">
          <img src={bookImg} alt="Book Appointment" className="w-[70%] h-[70%] object-cover" />
        </div>
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Doctor:</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Doctor</option>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {`${doc.name} (${doc.specialization})`}
                  </option>
                ))
              ) : (
                <option disabled>Loading doctors...</option>
              )}
            </select>

            {/* Show selected doctor image and details */}
            {selectedDoctor && selectedDoctorImage && (
              <div className="mt-4 flex items-center space-x-4">
                <img
                  src={selectedDoctorImage}
                  alt={selectedDoctor.name}
                  className="w-16 h-16 rounded-full object-cover border border-blue-300"
                />
                <div>
                  <p className="font-semibold text-lg">{selectedDoctor.name}</p>
                  <p className="text-gray-600 text-sm">{selectedDoctor.specialization}</p>
                </div>
              </div>
            )}

            <label className="block mt-4 mb-2">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-4 mb-2">Time Slot:</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={!formData.date || !formData.doctor}
            >
              <option value="">Select Time Slot</option>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))
              ) : (
                <option disabled>No slots available</option>
              )}
            </select>

            <label className="block mt-4 mb-2">Reason:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>

            <button
              type="submit"
              className="w-full mt-4 font-semibold bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
