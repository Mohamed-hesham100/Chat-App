// import { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import { IoClose } from "react-icons/io5";
// import { postData } from "../utils/api.js";
// import { Loader, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import uploadFile from "../utils/uploadFile";

// const Register = () => {
//   const navigate = useNavigate();
//   const [loading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     profile_pic: "",
//   });

//   const [uploadPhoto, setUploadPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUploadPhoto = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhotoPreview(URL.createObjectURL(file));
//       const uploadPhoto = await uploadFile(file);
//       setUploadPhoto(file);
//       setFormData((prev) => ({
//         ...prev,
//         profile_pic: uploadPhoto?.url,
//       }));
//     }
//   };

//   const handleRemovePhoto = () => {
//     setUploadPhoto(null);
//     setPhotoPreview(null);
//   };

//   const handleSubmite = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const res = await postData("/user/register", formData);
//     setIsLoading(false);

//     if (res.success) {
//       toast.success(res.message);
//       setFormData({ name: "", email: "", password: "", profile_pic: "" });
//       navigate("/login");
//     } else {
//       toast.error(res?.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center overflow-y-auto py-6 px-4">
//       <div className="flex flex-col lg:flex-row w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden border border-pink-200">
//         {/* Left Section */}
//         <div className="lg:w-1/2 w-full bg-pink-200 flex items-center justify-center p-8">
//           <div className="text-center">
//             <img
//               src="/images/logo3.png"
//               alt="Chat Logo"
//               className="w-24 lg:w-32 mx-auto mb-2 mt-3"
//             />
//             <h2 className="text-2xl lg:text-3xl font-bold text-pink-600">
//               Welcome to ChatApp!
//             </h2>
//             <p className="text-pink-500 mt-2 text-sm lg:text-base">
//               Join us and start chatting with your friends now
//             </p>
//           </div>
//         </div>

//         {/* Right Section - Form */}
//         <div className="lg:w-1/2 w-full flex items-center justify-center p-6 lg:p-10 bg-white">
//           <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmite}>
//             <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
//               Create an Account
//             </h2>

//             {/* Name Field */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-gray-700 font-semibold text-start mb-2"
//               >
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:opacity-70 transition"
//                 onChange={handleOnChange}
//                 value={formData.name}
//               />
//             </div>

//             {/* Email Field */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-semibold text-start mb-2"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="example@email.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:opacity-70 transition"
//                 onChange={handleOnChange}
//                 value={formData.email}
//               />
//             </div>

//             {/* Password Field */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-semibold text-start mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="********"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:opacity-70 transition"
//                 onChange={handleOnChange}
//                 value={formData.password}
//               />
//             </div>

//             {/* Profile Picture Upload */}
//             <div>
//               <label
//                 htmlFor="profile_pic"
//                 className="block text-gray-700 font-medium text-start mb-2"
//               >
//                 Profile Picture
//               </label>

//               {photoPreview ? (
//                 <div className="relative w-32 h-32 mb-3">
//                   <img
//                     src={photoPreview}
//                     alt="Preview"
//                     className="w-full h-full object-cover rounded-lg border"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleRemovePhoto}
//                     className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow cursor-pointer"
//                     title="Remove photo"
//                   >
//                     <IoClose size={15} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
//                   <input
//                     id="profile_pic"
//                     name="profile_pic"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleUploadPhoto}
//                     className="block w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 hover:scale-[1.02] transition-all duration-300"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span>Please Wait</span>
//                 </div>
//               ) : (
//                 "Register"
//               )}
//             </button>

//             <p className="text-center text-gray-600 mt-4 text-sm">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-pink-500 font-semibold hover:underline"
//               >
//                 Log in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { postData } from "../utils/api.js";
import { Loader2, MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";
import uploadFile from "../utils/uploadFile";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      setPhotoPreview(URL.createObjectURL(file));
      const uploaded = await uploadFile(file);

      if (!uploaded?.url) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      setUploadPhoto(file);
      setFormData((prev) => ({
        ...prev,
        profile_pic: uploaded.url,
      }));
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong during upload.");
    }
  };

  const handleRemovePhoto = () => {
    setUploadPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await postData("/user/register", formData);
    setIsLoading(false);
    if (res.success) {
      toast.success(res.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        profile_pic: "",
      });
      navigate("/login");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-y-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden border border-pink-200">
        {/* Left section */}
        <div className="lg:w-1/2 w-full bg-pink-200 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-center px-4 sm:px-6">
              <div className="pt-4 sm:pt-6">
                <div className="bg-gradient-to-tr from-pink-400 to-pink-600 p-2 sm:p-3 rounded-full shadow-xl inline-flex items-center justify-center">
                  <MessageCircleHeart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-pink-600 mt-2">
                Welcome to Chat App!
              </h2>
            </div>

            <p className="text-pink-500 mt-2 text-sm lg:text-base">
              Join us and start chatting with your friends now
            </p>
          </div>
        </div>
        {/* Right section - Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-6 lg:p-10 bg-white">
          <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
              Create an account
            </h2>
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-start mb-2"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:opacity-70 transition"
                onChange={handleOnChange}
                value={formData.name}
              />
            </div>
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold text-start mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:opacity-70 transition"
                onChange={handleOnChange}
                value={formData.email}
              />
            </div>
            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold text-start mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:opacity-70 transition"
                onChange={handleOnChange}
                value={formData.password}
              />
            </div>
            {/* Upload profile picture */}
            <div>
              <label
                htmlFor="profile_pic"
                className="block text-gray-700 font-medium text-start mb-2"
              >
                Profile picture
              </label>
              {photoPreview ? (
                <div className="relative w-32 h-32 mb-3">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow cursor-pointer"
                    title="Remove photo"
                  >
                    <IoClose size={15} />
                  </button>
                </div>
              ) : (
                <div className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                  <input
                    id="profile_pic"
                    name="profile_pic"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
                  />
                </div>
              )}
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-center text-gray-600 mt-4 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-500 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
