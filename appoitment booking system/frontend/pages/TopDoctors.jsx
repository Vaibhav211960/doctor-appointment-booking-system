import React, { useState } from "react";
import Navbar from "../components/Navbar";
import doc1 from "../src/assets/rDco1.png";
import doc2 from "../src/assets/doc2-removebg.png";
import doc3 from "../src/assets/doc3-removebg.png";
import doc4 from "../src/assets/doc4-removebg.png";
import doc5 from "../src/assets/doc5-removebg.png";
import doc6 from "../src/assets/doc6-removebg.png";
import doc7 from "../src/assets/doc7-removebg.png";
import doc8 from "../src/assets/doc8-removebg.png";
import { Navigate, useNavigate } from "react-router-dom";


const doctor = [
  {
    name: "Dr. Olivia Smith",
    image: doc3,
    specialization: "Cardiology",
    experience: "15 years",
    qualification: "MBBS, MD (Cardiology)",
    fees: "120",
    rating: 5,
    about:
      "Dr. Smith is a highly experienced cardiologist dedicated to heart health and patient care.",
    },
    {
      name: "Dr. Michael Brown",
      image: doc4,
      specialization: "Neurology",
      experience: "12 years",
      qualification: "MBBS, DM (Neurology)",
      fees: "150",
      rating: 4,
      about:
      "Dr. Brown specializes in neurological disorders, offering advanced treatment options.",
    },
    {
      name: "Dr. Aryan",
      image: doc5,
      specialization: "Orthopedics",
      experience: "10 years",
      qualification: "MBBS, MS (Orthopedics)",
      fees: "130",
      rating: 3.7,
      about:
      "Dr. Wilson is an expert in orthopedic surgeries, focusing on joint and bone health.",
    },
    {
      name: "Dr. Karan Patel",
      image: doc6,
      specialization: "Orthopedics",
      experience: "10 years",
      qualification: "MBBS, MS (Orthopedics)",
      fees: "130",
      rating: 4.7,
      about:
      "Dr. Wilson is an expert in orthopedic surgeries, focusing on joint and bone health.",
    },
    {
      name: "Dr. Sophia Wilson",
      image: doc7,
      specialization: "General",
      experience: "10 years",
      qualification: "MBBS, MS (Orthopedics)",
      fees: "130",
      rating: 4.4,
      about:
      "Dr. Wilson is an expert in orthopedic surgeries, focusing on joint and bone health.",
    },
  ];
  
  const DoctorCard = ({ doctor, onClick }) => {
    return (
      <div
      className="bg-gray-100 shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 text-center border border-blue-300 cursor-pointer"
      onClick={() => onClick(doctor)}
      >
      <img
        src={doctor.image || "default-doctor.jpg"}
        alt={doctor.name}
        className="w-32 h-32 mx-auto rounded-full object-cover object-top"
      />
      <p className="text-green-600 font-semibold mt-3">● Available</p>
      <h3 className="text-lg font-bold mt-2 text-black">{`${doctor.name}`}</h3>
      <p className="text-gray-600">{doctor.specialization}</p>

      {/* ⭐ Review Label */}
      <div className="mt-3 text-gray-900 font-semibold flex items-center justify-center">
        <span className="text-sm">
          rating {doctor.rating || "No reviews yet"} ⭐{" "}
        </span>
      </div>
    </div>
  );
};

const TopDoctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigator = useNavigate()
  
  return (
    <>
      {/* <Navbar /> */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Top Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
          {doctor.map((doctor, index) => (
            <DoctorCard
            key={index}
            doctor={doctor}
            onClick={setSelectedDoctor}
            />
          ))}
        </div>

        {selectedDoctor && (
          <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-40 z-50 ">
            <div className="relative bg-white p-10 md:p-12 rounded-2xl shadow-2xl shadow-gray-500/50 w-11/12 md:w-2/3 lg:w-1/2 transition-transform transform scale-100 border border-blue-300">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 text-red-500 text-3xl font-bold hover:text-red-700"
              >
                ❌
              </button>
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
                <img
                  src={selectedDoctor.image || "default-doctor.jpg"}
                  alt={selectedDoctor.name}
                  className="w-50 h-60 rounded-xl object-cover object-top shadow-lg border border-blue-300"
                  />
                <div className="text-center md:text-left space-y-4">
                  <h2 className="text-3xl font-bold text-black">
                    {selectedDoctor.name}{" "}
                    <span className="text-blue-600"></span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedDoctor.qualification} - {selectedDoctor.specialty}
                  </p>
                  <p className="text-md bg-blue-100 px-4 py-2 rounded-lg inline-block font-semibold text-black">
                    {selectedDoctor.experience} Years Experience
                  </p>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-black">
                      About :{" "}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {selectedDoctor.about}
                    </p>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    Appointment Fee :{" "}
                    <span className="text-green-600">
                      {selectedDoctor.fees}
                    </span>
                  </p>
                  <button
                    onClick={() => navigator('make-appointment')}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all"
                    >
                    Book Appointment Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TopDoctors;
