import React from "react";

import "../scss/gigCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GigCard = (props) => {
  const { gig } = props;
  let lat1 = gig.latLong[0];
  let long1 = gig.latLong[1];

  const [userLocation, setUserLocation] = useState({
    lat2: 0,
    long2: 0,
  });
  const [distance, setDistance] = useState(0);

  //get user longitude and latitude
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat2: position.coords.latitude,
          long2: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  //calculate distance between user and gig
  const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    getLocation();
    setDistance(
      getDistance(lat1, long1, userLocation.lat2, userLocation.long2).toFixed(1)
    );
  }, []);

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
        <Link to="/gig">
          <button>View</button>
        </Link>
      </div>
    </>
  );
};

export default GigCard;
