import React from "react";
import { motion } from "framer-motion";

import "./HomePage.css";

const HomePage: React.FC<any> = () => {

  // TODO: Add information to make it a sex landing page :)
  // TODO: Should really be more like an about page honestly
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="home"
    >
      <h1>Welcome to the Container Relocate!</h1>
      <div>ses</div>
    </motion.div>
  );
};

export default HomePage;
