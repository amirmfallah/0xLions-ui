import React from "react";
import "./Roadmap.css";

export default function Roadmap() {
  return (
    <div className="about-section">
      <div className="about-banner d-flex flex-column justify-content-center">
        <h2 className="about-title">Roadmap 1.0</h2>
      </div>
      <div className="container pt-5">
        <h3>25% Sold</h3>
        <ul className="mb-3">
          <li>
            10 lucky 0xLion holders will receive 100$ worth of ETH directly to
            their wallet!
          </li>
        </ul>
        <h3>50% Sold</h3>
        <ul>
          <li>
            A percent of the profits will go to marketing and pushing the
            collection. we will also give away 1500$ worth of ETH to multiple
            lucky 0xLion holders!
          </li>
        </ul>
        <h3>75% Sold</h3>
        <ul className="mb-3">
          <li>
            A percent of the profits will go to marketing and pushing the
            project and getting various influencers to join the project.
          </li>
          <li>
            We will also be giving away 10 Ledger Nano S’s to lucky 0xLion
            holders! We want all 0xLion holders to protect their assets. Stay
            safe in the opensea!
          </li>
        </ul>
        <h3>100% Sold</h3>
        <ul className="mb-3">
          <li>
            We will be giving away an original Lazy Lion to one of our lucky
            0xLion holders!
          </li>
          <li>
            We will also give away a MacBook Pro, 2 Apple Watches, and 3 pairs
            of AirPods to more of our lucky 0xLion holders!
          </li>
        </ul>
      </div>
    </div>
  );
}
