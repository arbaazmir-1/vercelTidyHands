import React from "react";

import "../scss/gigCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GigCard = (props) => {
  const { gig } = props;
  let lat1 = gig.coords[1];
  let long1 = gig.coords[0];
  const [distance, setDistance] = useState("");
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
        //convert to km
        const dInKm = d / 1000;
        //check if km is less than 1
        if (dInKm < 1) {
          //convert to m
          const dInM = dInKm * 1000;
          setDistance(`${Math.round(dInM)} Meters Away `);
        } else {
          setDistance(`${Math.round(dInKm)} Kilometers Away `);
        }
      });
    }
  }, [lat1, long1]);

  return (
    <>
      <div className="gigCard">
        <div className="gigIcon">
          {gig.category === "cleaning" && <i className="fas fa-broom"></i>}
          {gig.category === "delivery" && <i className="fas fa-truck"></i>}
          {gig.category === "gardening" && <i className="fas fa-seedling"></i>}
          {gig.category === "moving" && <i className="fas fa-truck-moving"></i>}
          {gig.category === "tutoring" && (
            <i className="fas fa-chalkboard-teacher"></i>
          )}
          {gig.category === "cooking" && <i className="fas fa-utensils"></i>}
          {gig.category === "petcare" && <i className="fas fa-paw"></i>}
          {gig.category === "tech" && <i className="fas fa-laptop"></i>}
          {gig.category === "handyman" && <i className="fas fa-tools"></i>}
          {gig.category === "babysitting" && <i className="fas fa-baby"></i>}
          {gig.category === "photography" && <i className="fas fa-camera"></i>}
          {gig.category === "music" && <i className="fas fa-music"></i>}
          {gig.category === "writing" && <i className="fas fa-pen"></i>}
          {gig.category === "design" && <i className="fas fa-paint-brush"></i>}
          {gig.category === "driving" && <i className="fas fa-car"></i>}
          {gig.category === "other" && <i className="fas fa-question"></i>}
        </div>
        <div className="gigInfo">
          <h3>{gig.title}</h3>
          <p>
            {distance} | {gig.noOfApplicants} Applicants{" "}
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
