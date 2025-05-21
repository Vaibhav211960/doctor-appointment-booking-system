import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DocTeam from '../src/assets/doc_team.png'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-6 py-12 bg-blue-50">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={DocTeam}
              alt="Doctors"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ABOUT <span className="text-blue-600">US</span>
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Welcome to <strong className="text-blue-700">MediLink</strong>, your trusted healthcare companion.  
              We provide a seamless solution for scheduling doctor appointments and managing your health efficiently.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At <strong className="text-blue-700">MediLink</strong>, we embrace innovation by integrating advanced  
              technology to enhance user experience and deliver outstanding healthcare management services.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-6">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to simplify the healthcare process by creating a direct  
              bridge between patients and healthcare providers, ensuring quick and easy access to medical services.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            WHY <span className="text-blue-600">CHOOSE US</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-blue-300 rounded-lg shadow-md bg-blue-100">
              <h4 className="font-semibold text-blue-800">EFFICIENCY</h4>
              <p className="text-gray-700 leading-relaxed">
                Our platform ensures a streamlined appointment scheduling process  
                that fits into your busy lifestyle effortlessly.
              </p>
            </div>
            <div className="p-6 border border-blue-300 rounded-lg shadow-md bg-blue-100">
              <h4 className="font-semibold text-blue-800">CONVENIENCE</h4>
              <p className="text-gray-700 leading-relaxed">
                Easily connect with a network of certified healthcare professionals  
                near you with just a few clicks.
              </p>
            </div>
            <div className="p-6 border border-blue-300 rounded-lg shadow-md bg-blue-100">
              <h4 className="font-semibold text-blue-800">PERSONALIZATION</h4>
              <p className="text-gray-700 leading-relaxed">
                Get customized healthcare recommendations and reminders  
                to stay proactive about your well-being.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
