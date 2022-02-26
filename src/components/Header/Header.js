import React from "react";
import "./Header.css";

export default function About() {
  return (
    <div className="d-flex flex-row align-items-center container my-3">
      <span className="header-title">0xLazyLions</span>
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
      <span className="menu-btn pl-2">Menu</span>
    </div>
  );
}
