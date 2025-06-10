import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updatedData } from "../utils/api";
import { setUser } from "../redux/userSlice";
import { FolderUp } from "lucide-react";
import uploadFile from "../utils/uploadFile";

const EditUserDetails = ({ onClose, user }) => {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadPhoto = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await updatedData("/user/update-user", formData);
    if (res.success) {
      toast.success(res?.message);
      dispatch(setUser(res?.user));
    } else {
      toast.error(res.message);
    }
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
          aria-label="Close the popup window"
        >
          ×
        </button>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Edit User Details</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="flex flex-col text-gray-700 text-xs sm:text-sm">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder:opacity-90 transition duration-300"
            />
          </label>

          <label htmlFor="bio" className="flex flex-col text-gray-700 text-xs sm:text-sm">
            Bio:
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Write something about yourself..."
              className="w-full px-3 sm:px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder:opacity-90 transition duration-300 resize-none"
            />
          </label>

          <label
            htmlFor="profile_pic"
            className="flex flex-col text-gray-700 text-xs sm:text-sm items-center"
          >
            Profile Picture:
            <input
              id="profile_pic"
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="relative mt-2 w-20 h-20 sm:w-24 sm:h-24">
              <label
                htmlFor="profile_pic"
                className="cursor-pointer group block w-full h-full"
              >
                <img
                  src={
                    formData.profile_pic
                      ? formData.profile_pic
                      : "https://via.placeholder.com/100x100.png?text=Upload"
                  }
                  alt="Click to upload"
                  className="w-full h-full object-cover rounded-full border shadow transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FolderUp className="text-white" size={20} sm:size={25} />
                </div>
              </label>
            </div>
          </label>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Please wait</span>
              </div>
            ) : (
              "Save"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;