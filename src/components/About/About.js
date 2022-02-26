import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-section">
      <div className="about-banner d-flex flex-column justify-content-center">
        <h2 className="about-title">About</h2>
      </div>
      <div className="container">
        <h2 className="text-center mt-4">The Team</h2>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 p-4 d-flex flex-column">
            <img
              src="/assets/m1.jpg"
              alt="Sef Elbatrawy"
              className="w-100"
            ></img>
            <p className="text-center team-name mt-2">Sef Elbatrawy</p>
            <p className="bio">
              One of the creators and founders of 0xLions V1. Sef has always had
              a business mindset, and that mindset paired with his creative
              ability makes anything he is working on truly special. Sef is
              ready to take the 0xLions past the moon and build this community
              to be one of the biggest and strongest on the NFT space. Him and
              the team are more than excited to dedicate everything they have
              towards this project. He has been in the NFT space for over a year
              and has exceptional experience in NFT and cryptocurrency. Sef is a
              dedicated and extremely hard worker, and entrepreneurship comes
              natural to him.
            </p>
          </div>
          <div className="col-12 col-md-4 col-lg-4 p-4 d-flex flex-column">
            <img
              src="/assets/m2.jpg"
              alt="Aboubakr Khalil"
              className="w-100"
            ></img>
            <p className="text-center team-name mt-2">Aboubakr Khalil</p>
            <p className="bio">
              One of the creators and founders of 0xLions V1. Aboubakr has
              always been dedicated to what he truly believes in. He is a
              natural born leader that will contribute his knowledge and
              expertise to better the team and this community. Aboubakr is
              always willing to take risks, and he sees what this community can
              become. Aboubakr knows that this is not a short-term project, he
              is here for the long run and the future. He sees the potential in
              NFT’s, and therefore is willing to sacrifice whatever it takes.
              Aboubakr has been heavily invested in the NFT and cryptocurrency
              community and truly believes this is the future.
            </p>
          </div>
          <div className="col-12 col-md-4 col-lg-4 p-4 d-flex flex-column">
            <img
              src="/assets/m3.jpg"
              alt="Karim Khalil"
              className="w-100"
            ></img>
            <p className="text-center team-name mt-2">Karim Khalil</p>
            <p className="bio">
              One of the creators and founders of 0xLions V1. Karim has always
              been at the top of his class always striving to be the best that
              he can be. He is invaluable to this team, as every member brings a
              different asset to this project. He firmly believes that this
              community combined with this team can go places unfathomable.
              Karim is always looking to reach new heights and break new
              barriers. Karim is more than ready to dedicate his time and
              passion to this team and this community/project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
