import React from "react";
import Logo from "../Images/logo.svg";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import "../scss/navwithbackbtn.scss";

const NavWithBackBtn = (props) => {
  const history = useNavigate();
  return (
    <>
      <div className="nav-with-back-btn">
        <div className="back-btn">
          <Button
            onClick={() => {
              history(-1);
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </Button>
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
