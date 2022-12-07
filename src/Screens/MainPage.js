import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import CatagoriesMenu from "../ components/CatagoriesMenu";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import GigCard from "../ components/GigCard";
import { useSelector, useDispatch } from "react-redux";
import { homepageAction } from "../actions/homepageAction";
import CurrentFeature from "../ components/currentFeature";
import HelperProfile from "../ components/HelperProfile";
import { detectBrowser } from "../detectBrower";
const MainPage = () => {
  const dispatch = useDispatch();

  const homepage = useSelector((state) => state.homePage);
  const { loading, error, data } = homepage;
  const { gigs, activeHelpers, gigsRadius } = data;

  //get user long and lat and then dispatch action
  const locationBasedApiCall = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

        dispatch(homepageAction({ long, lat }));
      });
    }
  };
  useEffect(() => {
    locationBasedApiCall();
  }, [dispatch]);

  return (
    <>
      <NavbarMobile />
      {loading ? (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          {typeof activeHelpers !== "undefined" && (
            <div className="profilesContainer">
              <h4 style={{ margin: "10px" }} className="helperNearCard">
                Helpers Near You
              </h4>

              {activeHelpers.map((helper) => (
                <HelperProfile key={helper._id} helper={helper} />
              ))}
            </div>
          )}
        </>
      )}
      <CatagoriesMenu />
      <div className="gigList">
        {loading ? (
          <div className="loading">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {typeof gigs !== "undefined" ? (
              <>
                <h4 style={{ margin: "10px" }} className="gigListCard">
                  Gigs Near You
                </h4>
                {gigs.map((gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </>
            ) : (
              <div className="noGigs">
                <h4>No Gigs Found</h4>
              </div>
            )}
          </>
        )}
      </div>

      <div className="currentFeature">
        <CurrentFeature />
      </div>
    </>
  );
};

export default MainPage;
