
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../utils/api.js";
import { Loader2, MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await postData("/api/user/login", formData);
    setIsLoading(false);
    if (res.success) {
      toast.success("Login successful");
      localStorage.setItem("token", res.token);
      Cookies.set("token", res.token);
      dispatch(setToken(res.token));
      navigate("/");
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-pink-200 rounded-xl shadow-2xl p-8 space-y-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="text-center px-4 sm:px-6">
          <div className="pt-4 sm:pt-6">
            <div className="bg-gradient-to-tr from-pink-400 to-pink-600 p-2 sm:p-3 rounded-full shadow-xl inline-flex items-center justify-center">
              <MessageCircleHeart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-1 sm:mb-2">
            Welcome back!
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div>
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
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder:opacity-70 transition duration-300"
            />
          </motion.div>
          <motion.div>
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
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder:opacity-70 transition duration-300"
            />
          </motion.div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Please wait</span>
              </div>
            ) : (
              "Log in"
            )}
          </motion.button>
          <div>
            <motion.p
              className="text-center text-sm text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-pink-500 font-semibold hover:underline"
              >
                Register
              </Link>
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-1"
            >
              <Link
                to="/forgot-password"
                className="text-sm text-pink-500 hover:underline"
              >
                Forgot your password?
              </Link>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
