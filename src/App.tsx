import React from "react";
import "./styles.css";
import Navbar from "./components/navbar/navbar";
import Container from "./components/container/container";
import Clouds from "./components/Clouds/Clouds";
import Ground from "./components/Ground/Ground";

const App = () => {
  const conRef = React.useRef(null);

  return (
    <div className="App">
      <Clouds />
      <Navbar />
      <Ground />
      {/*
        <div ref={conRef} className="Containers">
          <div className="ContainerFlex">
            <Container parent={conRef} number={1} color={0} />
            <Container parent={conRef} number={2} color={1} />
            <Container parent={conRef} number={3} color={2} />
            <Container parent={conRef} number={4} color={3} />
            <Container parent={conRef} number={5} color={4} />
            <Container parent={conRef} number={6} color={5} />
          </div>
          <div className="ContainerFlex">
            <Container parent={conRef} number={1} color={0} />
            <Container parent={conRef} number={2} color={1} />
            <Container parent={conRef} number={3} color={2} />
            <Container parent={conRef} number={4} color={3} />
            <Container parent={conRef} number={5} color={4} />
            <Container parent={conRef} number={6} color={5} />
          </div>
          <div className="ContainerFlex">
            <Container parent={conRef} number={1} color={0} />
            <Container parent={conRef} number={2} color={1} />
            <Container parent={conRef} number={3} color={2} />
            <Container parent={conRef} number={4} color={3} />
            <Container parent={conRef} number={5} color={4} />
            <Container parent={conRef} number={6} color={5} />
          </div>
        </div>
      */}
    </div>
  );
};

export default App;
