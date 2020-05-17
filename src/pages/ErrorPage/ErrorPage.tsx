import React, { useState } from "react";
import {
  motion,
  Transition,
  TargetAndTransition,
  Variants
} from "framer-motion";
import Quokka from "../../images/Quokka.png";
import "./ErrorPage.css";

const ErrorPage: React.FC<any> = () => {
  const [loaded, setLoaded] = useState(false);

  const loadedVariants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  const handleLoaded = () => {
    setLoaded(true);
  };

  const quokkaAnimation: TargetAndTransition = {
    backgroundColor: [
      "rgb(255,0,0)",
      "rgb(255,127,0)",
      "rgb(255,255,0)",
      "rgb(127,255,0)",
      "rgb(0,255,0)",
      "rgb(0,255,127)",
      "rgb(0,255,255)",
      "rgb(0,127,255)",
      "rgb(0,0,255)",
      "rgb(127,0,255)",
      "rgb(255,0,255)",
      "rgb(255,0,127)"
    ]
  };

  const quokkaTransition: Transition = {
    yoyo: Infinity,
    ease: "linear",
    duration: 3,
    delay: 0
  };

  return (
    <motion.div
      animate={loaded ? "open" : "closed"}
      variants={loadedVariants}
      onLoad={handleLoaded}
      className="error__main"
    >
      <h1>404</h1>
      <h2>Not found</h2>
      <p>We couldn't find the page you were looking for :(</p>
      <p>Here is a happy rainbow Quokka to cheer you up</p>
      <motion.img
        initial={false}
        animate={quokkaAnimation}
        transition={quokkaTransition}
        className="error__quokka"
        src={Quokka}
        alt="Quokka"
      />
    </motion.div>
  );
};

export default ErrorPage;
