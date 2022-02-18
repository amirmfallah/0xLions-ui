import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faDiscord, faEthereum} from '@fortawesome/free-brands-svg-icons'
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
  }

  inc() {
    this.setState(() => ({count: this.state.count+1}));
  }

  dec() {
    if (this.state.count > 0) {
      this.setState(() => ({count: this.state.count-1}));
    }
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
              <button className='mint-btn'>Connect Wallet</button>
            </div>

            <div className='d-flex flex-row align-items-center mt-5'>
              <a className='social-btn' href='https://twitter.com/0xDoodlesNFT_'>
                <FontAwesomeIcon icon={faTwitter} ></FontAwesomeIcon>
              </a>
              <div className='social-btn'>
                <FontAwesomeIcon icon={faDiscord} ></FontAwesomeIcon>
              </div>
              <div className='social-btn'>
                <img src='assets/opensea.svg' height="16px"></img>
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
