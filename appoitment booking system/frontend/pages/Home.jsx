import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Doc from "../src/assets/home.png";
import TopDoctors from "./TopDoctors";

export default function Home() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/make-appointment");
  };

  return (
    <div className="font-inter bg-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 flex items-center justify-center px-6">
        <div className="max-w-4xl text-left px-12">
          <h2 className="text-5xl font-extrabold leading-tight">
            Find Trusted Doctors & Book Appointments Easily
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Access top healthcare professionals near you and get expert 
            consultations without hassle.
          </p>
          <button
            onClick={handleOnClick}
            className="mt-6 bg-gray-100 hover:bg-gray-300 text-blue-700 px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition"
          >
            Book Appointment →
          </button>
        </div>
        <div className="overflow-hidden">
          <img className="h-96 rounded-xl shadow-lg" src={Doc} alt="Doctor team" />
        </div>
      </section>

      {/* Find by Speciality Section */}
      <section className="py-20 text-center bg-white shadow-md rounded-xl mx-4 md:mx-16 mt-10">
        <h3 className="text-3xl font-bold text-gray-800">Find Doctors by Speciality</h3>
        <p className="text-gray-500 mt-2">
          Browse our extensive list of trusted doctors and specialists.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {[
            { name: "General Physician", icon: "🩺" },
            { name: "Gynecologist", icon: "🤰" },
            { name: "Dermatologist", icon: "🧑‍⚕️" },
            { name: "Pediatricians", icon: "👶" },
            { name: "Neurologist", icon: "🧠" },
            { name: "Gastroenterologist", icon: "🩻" },
          ].map((speciality, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-gray-200 transition w-44 h-28 flex flex-col items-center justify-center rounded-xl text-lg font-medium shadow-sm"
            >
              <span className="text-4xl">{speciality.icon}</span>
              <p className="mt-2 text-gray-700">{speciality.name}</p>
            </div>
          ))}
        </div>
      </section>

      <TopDoctors />
      <Footer />
    </div>
  );
}
