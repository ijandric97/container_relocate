import React from "react";
import { motion } from "framer-motion";
import { useGlobalState } from "../../state/GlobalState";

import "./HomePage.css";

const HomePage: React.FC<any> = () => {
  const {
    state: { problem }
  } = useGlobalState();

  if (Object.keys(problem).length > 0) {
    return <div className="Game">Game</div>;
  }

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
