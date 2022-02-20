import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faDiscord,
  faEthereum,
} from "@fortawesome/free-brands-svg-icons";
import * as Swal from "sweetalert2";
import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "c6b542eeabaad77388f2f7a03a65922b", // required
      network: "rinkeby",
    },
  },
};
const contractABI = require("./XDoodlesNFTV3.json");
const NFT_ABI = contractABI.abi;
const NFT_CONTRACT_ADDRESS = "0xBb25cc38f1Fbb796411b8684913E73eB8D02bE2a";
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

    this.loadInstance();
  }
  web3Instance;
  contractInstance;

  async loadInstance() {
    this.web3Instance = new Web3("https://rinkeby-light.eth.linkpool.io");
    this.contractInstance = await new this.web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );
    setInterval(this.timer.bind(this), 5000);
  }

  web3Modal = new Web3Modal({
    network: "rinkeby", // optional
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
    if (parseInt(this.state.supply) + parseInt(this.state.count) <= 10000) {
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
      <div className="w-100 h-100 home-container">
        <div className="d-flex flex-column align-items-center">
          <h1 className="mb-3 title">0xDoodlesNFT V3</h1>
          <div className="para mb-3">
            <p className="box">
              An expansion collection of 10,000 regenerated unique Doodles with
              the Yellow Army spice!<br></br>Mint 0xDoodlesV3 between
              10,000-19,999.<br></br>Our contract uses ERC721A standard, which
              makes minting very optimized! Gas fee for 1 mint and 5 mints are
              the same!
            </p>
          </div>
          <span className="count">{this.state.supply}/10000</span>
          <div className="d-flex flex-row align-items-center mt-2">
            <div className="counter d-flex flex-row align-items-center">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon-btn"
                onClick={this.inc}
              />
              <span>{this.state.count}</span>
              <FontAwesomeIcon
                icon={faMinus}
                className="icon-btn"
                onClick={this.dec}
              />
            </div>
            {!this.state.wallet && (
              <button
                className="mint-btn"
                onClick={this.connectWallet}
                disabled={this.state.minting}
              >
                Connect Wallet
              </button>
            )}
            {!!this.state.wallet && (
              <button
                className="mint-btn"
                onClick={this.mint}
                disabled={this.state.minting}
              >
                Mint
              </button>
            )}
          </div>

          <div className="d-flex flex-row align-items-center mt-5">
            <a className="social-btn" href="https://twitter.com/0xDoodlesNFT_">
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </a>
            <a className="social-btn" href="https://discord.gg/Qnd3hpMf">
              <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
            </a>
            <div className="social-btn">
              <img src="assets/opensea.svg" alt="opensea" height="16px"></img>
            </div>
            <div className="social-btn">
              <FontAwesomeIcon icon={faEthereum}></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
