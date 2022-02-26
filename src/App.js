import "./App.css";
import React from "react";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Roadmap from "./components/Roadmap/Roadmap";
import Header from "./components/Header/Header";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <About />
        <Roadmap />
      </div>
    );
  }
}

export default App;
