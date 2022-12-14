import React from "react";

import "../scss/gigCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GigCard = (props) => {
  const { gig } = props;
  let lat1 = gig.coords[1];
  let long1 = gig.coords[0];
  const [distance, setDistance] = useState(0);
  let path = window.location.pathname;

  //measure distance between user and gig
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long2 = position.coords.longitude;
        const lat2 = position.coords.latitude;
        const R = 6371e3; // metres
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((long2 - long1) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres
        setDistance(Math.round(d / 1000));
      });
    }
  }, [lat1, long1]);

  return (
    <>
      <div className="gigCard">
        <div className="gigIcon">
          <i className="fas fa-broom"></i>
        </div>
        <div className="gigInfo">
          <h3>{gig.title}</h3>
          <p>
            {distance} KM Away | {gig.noOfApplicants} Applicants{" "}
          </p>
          <h4>${gig.price}/Hour</h4>
        </div>
        <Link to={{ pathname: "/gig/" + gig._id }}>
          <button>View</button>
        </Link>
      </div>
    </>
  );
};

export default GigCard;
