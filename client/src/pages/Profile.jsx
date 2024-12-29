import React, { useState } from "react";
import { Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiJson, apiUrl } from "../../services/apiJson";

const Profile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    profilePic: "",
  });
  const navigate = useNavigate()

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.bio);
    
    const data = new FormData();

    // Append form data
    data.append("bio", formData.bio);
    data.append("profilePic", formData.profilePic);

    try {
      // Send the form data to the backend
      const response = await apiJson.post(`${apiUrl}/api/v1/createProfile`, data, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      navigate("/chat")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-5 bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative mb-5 theme-sm ring-8 ring-slate-600 text-3xl rounded-full group mx-auto flex items-center justify-center h-64 w-64">
          <label htmlFor="profilePicInput" className="cursor-pointer relative h-full w-full flex items-center justify-center">
            <Avatar 
              className="h-full w-full"
              alt="Profile Picture" 
              src={formData.profilePic === "" ? "example.jpg" : URL.createObjectURL(formData.profilePic)} 
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <span className="text-white text-2xl">
                <EditIcon/>
              </span>
            </div>
          </label>
          <input
            name='profilePic'
            id="profilePicInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="my-5">
          <textarea
            placeholder="Bio"
            value={formData.bio}
            name='bio'
            id='bio'
            onChange={handleChange}
            rows="4"
            className="w-full h-24 p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button type="submit" className="w-full px-5 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
