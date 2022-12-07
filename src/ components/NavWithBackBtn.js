import React from "react";
import Logo from "../Images/logo.svg";
import { Link } from "react-router-dom";

import "../scss/navwithbackbtn.scss";

const NavWithBackBtn = () => {
  return (
    <>
      <div className="nav-with-back-btn">
        <div className="back-btn">
          <Link to="/main">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <div className="nav-title">
          <img src={Logo} alt="logo" />
        </div>
        <div className="whiteSpace"></div>
      </div>
    </>
  );
};

export default NavWithBackBtn;
