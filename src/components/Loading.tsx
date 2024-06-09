import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.h2
        className="text-xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
      >
        🌳 Loading Map 🌳
      </motion.h2>
    </motion.div>
  );
};

export default Loading;
