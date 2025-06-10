import React from "react";
import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center text-black">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center px-8 py-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full border border-pink-200"
      >
        {/* Logo icon */}
        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-gradient-to-tr from-pink-400 to-pink-500 p-5 rounded-full shadow-xl">
            <MessageCircleHeart className="text-white w-10 h-10" />
          </div>
        </motion.div>

        {/* App name */}
        <h1 className="text-5xl font-black text-pink-500 mb-3 tracking-wide drop-shadow-sm">
          ChatSpace
        </h1>

        {/* Tagline */}
        <p className="text-gray-700 text-base leading-relaxed px-2">
          Connect. Chat. Share your moments.
          <br />
          A stylish and secure chat experience.
        </p>

        {/* Action button */}
        <motion.button
          onClick={() => navigate("message")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LogoPage;
