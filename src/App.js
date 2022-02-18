import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faDiscord, faEthereum} from '@fortawesome/free-brands-svg-icons'
import * as Swal from 'sweetalert2';
import React from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    display: {
      name: "Mobile"
    },
    package: WalletConnectProvider,
    options: {
      infuraId: "c6b542eeabaad77388f2f7a03a65922b" // required
    }
  },
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: "https://localhost:8545", // optional
        chainId: 1337, // optional
        networkId: 1337 // optional
      },
      config: {
        buildEnv: "development" // optional
      }
    }
  }
};

const contractABI = require('./GameItem.json')
const NFT_ABI = contractABI.abi
const NFT_CONTRACT_ADDRESS = "0x5E2dEe3fF7e7368C60c6cf21306635D80B3742Ae"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0, wallet: undefined, minting: false, web3: undefined, supply: 0};
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.connectWallet = this.connectWallet.bind(this);
    this.mint = this.mint.bind(this);
    this.loadCount = this.loadCount.bind(this);
    this.loadCount();
  }

  web3Modal = new Web3Modal({
    network: "mumbai", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  inc() {
    if(this.state.minting) {
      return;
    }
    this.setState({count: this.state.count+1});
  }

  dec() {
    if(this.state.minting) {
      return;
    }
    if (this.state.count > 0) {
      this.setState({count: this.state.count-1});
    }
  }

  async loadCount() {
    const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
    const contract = await new web3.eth.Contract(NFT_ABI,NFT_CONTRACT_ADDRESS);
    contract.methods.totalSupply().call().then((count) => {
      this.setState({supply: count});
    })
  }

  async connectWallet() {
    const res = await this.web3Modal.toggleModal();
    console.log(res);
    const provider = await this.web3Modal.connect();
    this.setState({web3: new Web3(provider)})
    this.setState({wallet: (await this.state.web3.eth.getAccounts())[0]})
    console.log(this.state.wallet)
  }

  async mint() {
    if(this.state.minting) {
      return;
    }
    const contract = await new this.state.web3.eth.Contract(NFT_ABI,NFT_CONTRACT_ADDRESS);
    this.setState({minting: true});
    contract.methods.mintItem(this.state.wallet, `https://ipfs.io/ipfs/QmdnbSaYXWot4yokGKPhZYr2vK7veUf2inmqTBPa2L3pQ1`)
      .send({ from: this.state.wallet }).then(async () => {
        await Swal.fire({title: 'Congratulations!',
        text: 'You just minted a 0xDoodlesNFT V3. Welcome to the family.',
        icon:'success',
        heightAuto: false
      })
      this.setState({minting: false});
      }).catch(async (error) => {
        await Swal.fire({title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
        icon:'error',
        heightAuto: false
      })
      this.setState({minting: false});
      });
  }

  render() {
    return (
      <div className='w-100 h-100 home-container'>
          <div className='d-flex flex-column align-items-center'>
            <h1 className='mb-3 title'>0xDoodlesNFT V3</h1>
            <div className='para mb-3'>
              <p className='box'>An expansion collection of 10,000 regenerated unique Doodles with the Yellow Army spice!<br></br>Mint 0xDoodlesV3 between 10,000-19,999.<br></br>Our contract uses ERC721A standard, which makes minting very optimized! Gas fee for 1 mint and 5 mints are the same!</p>
            </div>
            <span className='count'>{this.state.supply}/10000</span>
            <div className='d-flex flex-row align-items-center mt-2'>
              <div className='counter d-flex flex-row align-items-center'>
                <FontAwesomeIcon icon={faPlus} className="icon-btn"  onClick={this.inc}/>
                <span>{this.state.count}</span>
                <FontAwesomeIcon icon={faMinus} className="icon-btn"  onClick={this.dec}/>
              </div>
              { !this.state.wallet && <button className='mint-btn' onClick={this.connectWallet} disabled={this.state.minting}>Connect Wallet</button>}
              { !!this.state.wallet && <button className='mint-btn' onClick={this.mint} disabled={this.state.minting}>Mint</button>}

            </div>

            <div className='d-flex flex-row align-items-center mt-5'>
              <a className='social-btn' href='https://twitter.com/0xDoodlesNFT_'>
                <FontAwesomeIcon icon={faTwitter} ></FontAwesomeIcon>
              </a>
              <div className='social-btn'>
                <FontAwesomeIcon icon={faDiscord} ></FontAwesomeIcon>
              </div>
              <div className='social-btn'>
                <img src='assets/opensea.svg' alt='opensea' height="16px"></img>
              </div>
              <div className='social-btn'>
                <FontAwesomeIcon icon={faEthereum} ></FontAwesomeIcon>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
