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
        <p className="footer p-0">
          0xLionsV1 website and smart contract developed by{" "}
          <a href="https://twitter.com/Web3Amir">@Web3Amir</a>.
        </p>
        <p className="footer">© 0xLionsV1</p>
      </div>
    );
  }
}

export default App;
