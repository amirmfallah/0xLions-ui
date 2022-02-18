import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faDiscord, faEthereum} from '@fortawesome/free-brands-svg-icons'
import React from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */
};

const contractABI = require('./GameItem.json')
const NFT_ABI = contractABI.abi
const NFT_CONTRACT_ADDRESS = "0x5E2dEe3fF7e7368C60c6cf21306635D80B3742Ae"
var web3;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0, wallet: undefined};
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.connectWallet = this.connectWallet.bind(this);
    this.mint = this.mint.bind(this);

  }

  web3Modal = new Web3Modal({
    network: "mumbai", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });
  web3;
  inc() {
    this.setState({count: this.state.count+1});
  }

  dec() {
    if (this.state.count > 0) {
      this.setState({count: this.state.count-1});
    }
  }

  async connectWallet() {
    const provider = await this.web3Modal.connect();
    this.web3 = new Web3(provider);
    this.setState({wallet: (await this.web3.eth.getAccounts())[0]})
    console.log(this.state.wallet)
  }

  async mint() {
    const contract = await new this.web3.eth.Contract(NFT_ABI,NFT_CONTRACT_ADDRESS);
    contract.methods.mintItem(this.state.wallet, `https://ipfs.io/ipfs/QmdnbSaYXWot4yokGKPhZYr2vK7veUf2inmqTBPa2L3pQ1`)
      .send({ from: this.state.wallet }).then(console.log('minted')).catch(error => console.log(error));
  }

  render() {
    return (
      <div className='w-100 h-100 home-container'>
          <div className='d-flex flex-column align-items-center'>
            <h1 className='mb-3 title'>0xDoodlesNFT V3</h1>
            <div className='para mb-3'>
              <p className='box'>An expansion collection of 10,000 regenerated unique Doodles with the Yellow Army spice!<br></br>Mint 0xDoodlesV3 between 10,000-19,999.<br></br>Our contract uses ERC721A standard, which makes minting very optimized! Gas fee for 1 mint and 5 mints are the same!</p>
            </div>
            <span className='count'>0/10000</span>
            <div className='d-flex flex-row align-items-center mt-2'>
              <div className='counter d-flex flex-row align-items-center'>
                <FontAwesomeIcon icon={faPlus} className="icon-btn"  onClick={this.inc}/>
                <span>{this.state.count}</span>
                <FontAwesomeIcon icon={faMinus} className="icon-btn"  onClick={this.dec}/>
              </div>
              { !this.state.wallet && <button className='mint-btn' onClick={this.connectWallet}>Connect Wallet</button>}
              { !!this.state.wallet && <button className='mint-btn' onClick={this.mint}>Mint</button>}

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
