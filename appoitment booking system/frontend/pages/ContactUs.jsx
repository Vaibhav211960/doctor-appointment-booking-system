import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import officeImg from '../src/assets/office.png'

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-blue-50">
        <section className="py-12 px-6 max-w-6xl mx-auto  text-gray-700">
          <h2 className="text-center text-3xl font-bold mb-8 text-gray-900">
            CONTACT <span className="text-blue-600">US</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={officeImg}
                alt="Doctor with patient"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-6">
              <div className="p-6 border border-blue-300 rounded-lg shadow-md bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-800">
                  OUR OFFICE
                </h3>
                <p className="text-gray-700 mt-3">
                  101 MediLink, navrangpura, india
                </p>
                <p className="text-gray-700 mt-2">📧 MediLink@gmail.com</p>
                <p className="text-gray-700 mt-2">📞 (111) 222-3333</p>
              </div>
              <div className="p-6 border border-blue-300 rounded-lg shadow-md bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-800">
                  CAREERS AT MediLink
                </h3>
                <p className="text-gray-700">
                  Learn more about our teams and job openings.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
