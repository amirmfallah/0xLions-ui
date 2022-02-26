import React from "react";
import "./Header.css";

export default function About() {
  return (
    <div className="d-flex flex-row align-items-center container my-3">
      <span className="header-title">0xLions V1</span>
      <div className="flex-1 flex-grow-1"></div>
      <div className="connect-btn mr-2">
        <img
          src="/assets/metamask.png"
          alt="metamask"
          height={24}
          className="metamask"
        ></img>
        <span>Connect Wallet</span>
      </div>
    </div>
  );
}
