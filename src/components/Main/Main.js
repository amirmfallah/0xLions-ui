import {
  faDiscord,
  faEthereum,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Main.css";

export default function Main() {
  return (
    <div className="main-section container pt-3 pb-3">
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
            across the 0xLions private island. More than half of the population
            has been infected by this DNA splicing disease. Due to the extreme
            nature of this sickness, the 0xLions have been forced into
            quarantine. Those infected seem to be experiencing extreme
            transformations drastically affecting their appearance. Doctors and
            scientists across the island are intensely researching and heavily
            experimenting this and have yet to derive a solution…. To be
            continued.
          </p>
          <div className="d-flex flex-row align-items-center mt-3 mb-3">
            <div className="round-btn">
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </div>
            <div className="round-btn">
              <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
            </div>
            <div className="round-btn">
              <img src="/assets/opensea.svg" alt="opensea" height="16px"></img>
            </div>
            <div className="round-btn no-margin">
              <FontAwesomeIcon icon={faEthereum}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center">
          <img src="/assets/1.jpeg" alt="sneakpeak" className="w-100"></img>
          <span className="text-center mt-3">
            One 0xLions V1 NFT cost 0.02 ETH
          </span>
          <h2 className="text-center mt-3">0/6000</h2>
          <div className="d-flex flex-row justify-content-center align-items-center mt-2">
            <div className="d-flex flex-row justify-content-center align-items-center count-container">
              <div className="round-btn">
                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
              </div>
              <span className="count">1</span>
              <div className="round-btn m-0">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </div>
            </div>
            <button className="btn2">Mint</button>
          </div>
        </div>
      </div>
    </div>
  );
}
