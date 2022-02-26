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
    <div className="main-section container pt-3">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6">
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
          <div className="d-flex flex-row align-items-center mt-5">
            <div className="round-btn">
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </div>
            <div className="round-btn">
              <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
            </div>
            <div className="round-btn">
              <img src="/assets/opensea.svg" alt="opensea" height="16px"></img>
            </div>
            <div className="round-btn">
              <FontAwesomeIcon icon={faEthereum}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center">
          <img src="/assets/1.jpeg" alt="sneakpeak" className="w-100"></img>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <div className="round-btn">
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
            </div>
            <div className="h-100 count-container">1</div>
            <div className="round-btn">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </div>
          </div>
          <button className="btn2 mt-4">Buy</button>
          <span className="text-center mt-3">
            One 0xLions V1 NFT cost 0.02 ETH
          </span>
        </div>
      </div>
    </div>
  );
}
