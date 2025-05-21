import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import doc1 from '../src/assets/rDco1.png'
import doc2 from '../src/assets/doc2-removebg.png'
import doc3 from '../src/assets/doc3-removebg.png'
import doc4 from '../src/assets/doc4-removebg.png'
import doc5 from '../src/assets/doc5-removebg.png'
import doc6 from '../src/assets/doc6-removebg.png'
import doc7 from '../src/assets/doc7-removebg.png'
import doc8 from '../src/assets/doc8-removebg.png'

const doctorImages = {
  "rDco1.png": doc1,
  "doc2.png": doc2,
  "doc3.png": doc3,
  "doc4.png": doc4,
  "doc5.png": doc5,
  "doc6.png": doc6,
  "doc7.png": doc7,
  "doc8.png": doc8,
};

const DoctorCard = ({ doctor, onClick }) => {
  return (
    <div
      className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 text-center border border-blue-300 cursor-pointer"
      onClick={() => onClick(doctor)}
    >
      {console.log(doctor.image)}
      <img
        src={doctorImages[doctor.image] || "default-doctor.jpg"}
        alt={doctor.name}
        className="w-32 h-32 mx-auto rounded-full object-cover object-top"
      />
      <p className="text-green-600 font-semibold mt-3">● Available</p>
      <h3 className="text-lg font-bold mt-2 text-black">{`${doctor.name} (${doctor.specialization})`}</h3>
      <p className="text-gray-600">{doctor.specialty}</p>
      
      {/* ⭐ Review Label */}
      <div className="mt-3 text-gray-900 font-semibold flex items-center justify-center">
        <span className="text-sm">rating {doctor.rating || "No reviews yet"} ⭐ </span>
      </div>
    </div>
  );
};

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/doctors"); // Replace with actual backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data); // Assuming backend returns an array of objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p className="text-center text-xl text-blue-700">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <section className="py-4 px-10 md:px-32 bg-blue-50">

      <h2 className="text-3xl font-extrabold text-gray-800 text-center pb-6">
  Meet Our Expert Specialists
</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} onClick={setSelectedDoctor} />
          ))}
        </div>

        {selectedDoctor && (
          <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-40 z-50">
            <div className="relative bg-white p-10 md:p-12 rounded-2xl shadow-2xl shadow-gray-500/50 w-11/12 md:w-2/3 lg:w-1/2 transition-transform transform scale-100 border border-blue-300">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 text-red-500 text-3xl font-bold hover:text-red-700"
              >
                ❌
              </button>
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
                <img
                  src={doctorImages[selectedDoctor.image] || "default-doctor.jpg"}
                  alt={selectedDoctor.name}
                  className="w-40 h-40 rounded-xl object-cover object-top shadow-lg border border-blue-300"
                />
                <div className="text-center md:text-left space-y-4">
                  <h2 className="text-3xl font-bold text-black">
                    {selectedDoctor.name} <span className="text-blue-600"></span>
                  </h2>
                  <p className="text-lg text-gray-600">{selectedDoctor.qualification} - {selectedDoctor.specialty}</p>
                  <p className="text-md bg-blue-100 px-4 py-2 rounded-lg inline-block font-semibold text-black">
                    {selectedDoctor.experience} Years Experience 
                  </p>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-black">About : </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{selectedDoctor.about}</p>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    Appointment Fee : <span className="text-green-600">{selectedDoctor.fees}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default AllDoctors;
