import logo from "./logo.svg";
import "./App.css";
import Home from "./Home.js";
import Web3 from "web3";
// import Web3Provider from "web3-react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Home />
      </Web3ReactProvider>
    </div>
  );
}

export default App;
