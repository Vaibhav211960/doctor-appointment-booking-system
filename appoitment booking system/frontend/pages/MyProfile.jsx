import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Save, Camera } from "lucide-react";
import userImg from "../src/assets/user.jpg";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/users/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");

        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsEditing(false);
      } else {
        console.error("Error updating user:", data.message);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-red-500 text-3xl font-semibold hover:text-red-700 cursor-pointer"
        >
          ❌
        </button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full p-8 bg-white shadow-2xl rounded-2xl border border-gray-300"
      >

        <h2 className="text-3xl font-bold text-center text-gray-800">
          My Profile
        </h2>
        <div className="flex flex-col items-center mt-6 relative">
          <label htmlFor="profileUpload" className="relative cursor-pointer">
            <img
              src={profileImage || userImg || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full shadow-lg border-4 border-blue-400 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full shadow-md">
              <Camera size={20} className="text-white" />
            </div>
          </label>
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            onChange={handleProfileImageChange}
          />
          <p className="mt-3 text-lg font-semibold text-gray-800">
            {user?.username || "Your Name"}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <p className="p-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300">
              {user?.email || "your.email@example.com"}
            </p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={user?.phone || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white text-gray-900 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="p-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300">
                {user?.phone || "Not provided"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={user?.address || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white text-gray-900 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              ></textarea>
            ) : (
              <p className="p-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300">
                {user?.address || "No address available"}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="w-full p-3 flex justify-center items-center gap-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            {isEditing ? <Save size={20} /> : <Edit size={20} />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default MyProfile;
