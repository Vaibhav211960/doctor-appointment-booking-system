import React, { useState } from "react";
import DocPhoto from "../src/assets/SignUp.jpeg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again!");
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setLoading(false);
      
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }
      
      localStorage.setItem("token", data.token);
      alert("Account created!");
      setIsLogin(true);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100 text-gray-900">
      {/* Left Section with Image and Text */}
      <div className="w-1/2 relative flex justify-end flex-col bg-blue-700">
        <img src={DocPhoto} alt="Doctor" className="absolute w-full h-screen object-cover opacity-90" />
        <div className="z-10 h-[40%] w-full p-8 bg-blue-500/40 rounded-lg text-center text-white">
          <h1 className="text-4xl font-bold">Your Health, Your Time</h1>
          <h2 className="text-2xl font-semibold mt-2">Book Appointments Instantly!</h2>
          <p className="text-lg mt-4">Find and book appointments with trusted doctors anytime, anywhere.</p>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-96 border border-blue-300">
          {isLogin ? (
            <>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
              {error && <p className="text-red-500 text-center mb-2">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded-full font-semibold mt-4 hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              <p className="mt-4 text-center text-gray-600 cursor-pointer" onClick={() => setIsLogin(false)}>
                Don't have an account? <span className="text-blue-500 font-semibold">Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Create an Account</h2>
              {error && <p className="text-red-500 text-center mb-2">{error}</p>}
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="987 654 3210"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your address"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded-full font-semibold mt-4 hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
              <p className="mt-4 text-center text-gray-600 cursor-pointer" onClick={() => setIsLogin(true)}>
                Already have an account? <span className="text-blue-500 font-semibold">Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
