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
  let gigs, activeHelpers, gigsRadius;
  if (data) {
    gigs = data.gigs;
    activeHelpers = data.activeHelpers;
    gigsRadius = data.gigsRadius;
  }

  //get user long and lat and then dispatch action
  const locationBasedApiCall = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        //check if lang and lat are correct
        // const long = 101.60983276367188;
        // const lat = 4.823666572570801;
        if (lat > 90 || lat < -90 || long > 180 || long < -180) {
          alert("Please check your location settings");
          return;
        }

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
            <>
              <h4 style={{ margin: "10px" }} className="gigListCard">
                Helpers Near You
              </h4>
              <div className="profilesContainer">
                {activeHelpers.map((helper) => (
                  <HelperProfile key={helper._id} helper={helper} />
                ))}
              </div>
            </>
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
            {typeof gigs !== "undefined" && (
              <>
                <h4 style={{ margin: "10px" }} className="gigListCard">
                  Gigs Near You
                </h4>
                {gigs.length > 0 ? (
                  <div className="gigListContainer">
                    {gigs.map((gig) => (
                      <GigCard key={gig._id} gig={gig} />
                    ))}
                  </div>
                ) : (
                  <div className="noGigs">
                    <h4>No Gigs Found</h4>
                    <p>
                      Try changing your location or search for a different
                      category
                    </p>
                  </div>
                )}
              </>
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
