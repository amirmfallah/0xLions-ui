import "./App.css";

import * as Swal from "sweetalert2";
import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Roadmap from "./components/Roadmap/Roadmap";
import Header from "./components/Header/Header";

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "c6b542eeabaad77388f2f7a03a65922b", // required
      network: "mainnet",
    },
  },
};
const contractABI = require("./XDoodlesNFTV3.json");
const NFT_ABI = contractABI.abi;
const NFT_CONTRACT_ADDRESS = "0xE65290Fc72Cd9445ecB98136324d9BE58337D57c";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      wallet: undefined,
      minting: false,
      web3: undefined,
      supply: 0,
    };

    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.connectWallet = this.connectWallet.bind(this);
    this.mint = this.mint.bind(this);
    this.loadCount = this.loadCount.bind(this);
    this.loadInstance = this.loadInstance.bind(this);

    //this.loadInstance();
  }
  web3Instance;
  contractInstance;

  async loadInstance() {
    this.web3Instance = new Web3(
      "https://mainnet.infura.io/v3/eff0770e240c478bac80351b31dd5e97"
    );
    this.contractInstance = await new this.web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );
    setInterval(this.timer.bind(this), 5000);
  }

  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: false, // optional
    providerOptions, // required
  });

  inc() {
    if (this.state.minting) {
      return;
    }
    if (this.state.count >= 10) {
      return;
    }
    this.setState({ count: this.state.count + 1 });
  }

  dec() {
    if (this.state.minting) {
      return;
    }
    if (this.state.count > 1) {
      this.setState({ count: this.state.count - 1 });
    }
  }

  async timer() {
    if (!this.state.minting) {
      await this.loadCount();
    }
  }

  async loadCount(web) {
    try {
      this.contractInstance.methods
        .totalSupply()
        .call()
        .then((count) => {
          this.setState({ supply: count });
        });
    } catch (e) {
      await this.loadInstance();
    }
  }

  async connectWallet() {
    const provider = await this.web3Modal.connect();
    this.web3Instance = this.setState({ web3: new Web3(provider) });
    this.setState({ wallet: (await this.state.web3.eth.getAccounts())[0] });
    console.log(this.state.wallet);
  }

  async mint() {
    if (this.state.minting) {
      return;
    }
    const contract = await new this.state.web3.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );
    this.setState({ minting: true });

    const nonce = await this.state.web3.eth.getTransactionCount(
      this.state.wallet,
      "latest"
    ); //get latest nonce

    let free = 1;
    console.log(parseInt(this.state.supply), parseInt(this.state.count));
    if (parseInt(this.state.supply) + parseInt(this.state.count) <= 1100) {
      free = 0;
    }
    console.log(free);
    //the transaction
    const tx = {
      from: this.state.wallet,
      to: NFT_CONTRACT_ADDRESS,
      nonce: nonce,
      maxPriorityFeePerGas: 2999999987,
      value: this.state.web3.utils.toWei(
        (0.01 * this.state.count * free).toString(),
        "ether"
      ),
    };

    contract.methods
      .mintItem(this.state.web3.utils.toBN(this.state.count))
      .send(tx)
      .then(async () => {
        await Swal.fire({
          title: "Congratulations!",
          text: "You just minted a 0xDoodlesNFT V3. Welcome to the family.",
          icon: "success",
          heightAuto: false,
        });
        this.setState({ minting: false });
      })
      .catch(async (error) => {
        await Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          heightAuto: false,
        });
        this.setState({ minting: false });
      });
  }

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
