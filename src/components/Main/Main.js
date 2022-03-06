import {
  faDiscord,
  faEthereum,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Main.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as Swal from "sweetalert2";

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "a6a041ec814f43d8aef380b4cd8a20df", // required
      network: "mainnet",
    },
  },
};

const contractABI = require("../../XDoodlesNFTV3.json");
const NFT_ABI = contractABI.abi;
const NFT_CONTRACT_ADDRESS = "";

class Main extends React.Component {
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
      "https://rinkeby.infura.io/v3/a6a041ec814f43d8aef380b4cd8a20df"
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
    if (this.state.count >= 20) {
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
    if (this.state.wallet) {
      this.setState({ wallet: undefined });
      return;
    }
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
    if (parseInt(this.state.supply) + parseInt(this.state.count) <= 1000) {
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
      <div className="main-section container pt-3 pb-3">
        <div className="d-flex flex-row align-items-center mb-3">
          <img src="/assets/banner.png" alt="logo" height={80}></img>
          <div className="flex-1 flex-grow-1"></div>
          <div className="connect-btn mr-2" onClick={this.connectWallet}>
            <img
              src="/assets/metamask.png"
              alt="metamask"
              height={24}
              className="metamask"
            ></img>
            <span>
              {this.state.wallet ? "Disconnect Wallet" : "Connect Wallet"}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center">
            <h3 className="main-title">
              0xLions V1 is a Collection of 6000 Unique Regenerated Lions living
              on the Ethereum blockchain.
            </h3>
            <p>
              0xLions V1 is not affiliated with Lazy Lions or any other NFT
              projects.
            </p>
            <p>
              In a parallel universe, a DNA splicing disease has rapidly spread
              across the 0xLions private island. More than half of the
              population has been infected by this DNA splicing disease. Due to
              the extreme nature of this sickness, the 0xLions have been forced
              into quarantine. Those infected seem to be experiencing extreme
              transformations drastically affecting their appearance. Doctors
              and scientists across the island are intensely researching and
              heavily experimenting this and have yet to derive a solution…. To
              be continued.
            </p>
            <p className="bold">
              Our contract uses ERC721A standard, which makes minting very
              optimized! Gas fee for 1 mint and 20 mints are the same!
            </p>
            <div className="d-flex flex-row align-items-center mt-3 mb-3">
              <a className="round-btn" href="https://twitter.com/0xLions_V1">
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </a>
              <a
                className="round-btn"
                href="https://discord.com/invite/FNVZZkyRvX"
              >
                <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
              </a>
              <div className="round-btn">
                <img
                  src="/assets/opensea.svg"
                  alt="opensea"
                  height="16px"
                ></img>
              </div>
              <div className="round-btn">
                <FontAwesomeIcon icon={faEthereum}></FontAwesomeIcon>
              </div>
              <a
                className="round-btn no-margin"
                href="https://medium.com/@0xLions/0x-lions-v1-571242bb8967"
              >
                <FontAwesomeIcon icon={faMedium}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <img
              src="/assets/sneak.gif"
              alt="sneakpeak"
              className="w-100"
            ></img>
            <span className="text-center mt-3">
              One 0xLions V1 NFT cost 0.02 ETH
            </span>
            <span className="text-center mt-1">First 1,000 Mints Free</span>
            <h2 className="text-center mt-3">{this.state.supply}/6000</h2>
            <div className="d-flex flex-row justify-content-center align-items-center mt-2">
              <div className="d-flex flex-row justify-content-center align-items-center count-container">
                <div className="round-btn" onClick={this.dec}>
                  <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                </div>
                <span className="count">{this.state.count}</span>
                <div className="round-btn m-0" onClick={this.inc}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </div>
              </div>
              <button className="btn2" disabled={!this.state.wallet}>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
