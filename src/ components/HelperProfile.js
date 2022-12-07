import { Button } from "@chakra-ui/react";
import React from "react";
import "../scss/HelperProfile.scss";

const HelperProfile = (props) => {
  const { helper } = props;

  return (
    <>
      <div className="helperProfileCard">
        <div className="helperProfileImage">
          <img src={helper.seller.avatar} alt="" />

          <div className="helperProfileRating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="helperProfileInfo">
          <h3>{helper.seller.name}</h3>
          <p>$10/hr</p>
        </div>
      </div>
    </>
  );
};

export default HelperProfile;
