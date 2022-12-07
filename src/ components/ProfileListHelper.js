import React from "react";
import { Link } from "react-router-dom";
import HelperProfile from "../ components/HelperProfile";
import "../scss/ProfileListHelper.scss";

const ProfileListHelper = () => {
  const arrayOne = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className="profilesContainer">
        {arrayOne.map((item) => (
          <Link to="/helperprofile" key={item}>
            <HelperProfile className="helper" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProfileListHelper;
