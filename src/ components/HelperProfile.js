import { Button } from "@chakra-ui/react";
import React from "react";
import "../scss/HelperProfile.scss";

const HelperProfile = () => {
  return (
    <>
      <div className="helperProfileCard">
        <div className="helperProfileImage">
          <img
            src="https://images.pexels.com/photos/5691840/pexels-photo-5691840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />

          <div className="helperProfileRating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="helperProfileInfo">
          <h3>John Doe</h3>
          <p>$10/hr</p>
        </div>
      </div>
    </>
  );
};

export default HelperProfile;
