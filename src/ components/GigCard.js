import React from "react";

import "../scss/gigCard.scss";
import { Link } from "react-router-dom";

const GigCard = () => {
  return (
    <>
      <div className="gigCard">
        <div className="gigIcon">
          <i className="fas fa-broom"></i>
        </div>
        <div className="gigInfo">
          <h3>Cleaning</h3>
          <p>10km Away | 10 Applicants</p>
          <h4>$20/2Hours</h4>
        </div>
        <Link to="/gig">
          <button>View</button>
        </Link>
      </div>
    </>
  );
};

export default GigCard;
