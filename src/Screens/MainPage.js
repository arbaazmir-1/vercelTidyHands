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

  const [accessLocation, setAccessLocation] = React.useState("denied");
  //ask user to turn on location on mobile device

  //check if user has location on
  const checkLocationService = async () => {
    let result = await navigator.permissions.query({ name: "geolocation" });
    if (result.state === "granted") {
      setAccessLocation("granted");
    } else {
      setAccessLocation("denied");
    }
  };

  //get user long and lat and then dispatch action
  const locationBasedApiCall = () => {
    checkLocationService();
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
      {accessLocation === "denied" && (
        <div className="noGigs">
          <h1>
            <i className="fas fa-exclamation-triangle"></i>
          </h1>
          <h1>Location Access Denied</h1>
          <h3>Please turn on location access to see active helpers</h3>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner"></i>
        </div>
      ) : error ? (
        <h1>{error}</h1>
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
            <i className="fas fa-spinner"></i>
          </div>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            {typeof gigs !== "undefined" && (
              <>
                <h4 style={{ margin: "10px" }}>Gigs within {gigsRadius}KM</h4>
                {gigs.map((gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </>
            )}
            {accessLocation === "denied" ? (
              <div className="noGigs">
                <h1>
                  <i className="fas fa-exclamation-triangle"></i>
                </h1>
                <h1>Location Access Denied</h1>
                <h3>Please turn on location access to see gigs near you</h3>
              </div>
            ) : (
              typeof gigs === "undefined" && (
                <div className="noGigs">
                  <h1>
                    <i className="fas fa-exclamation-triangle"></i>
                  </h1>
                  <h1>No Gigs Found</h1>
                  <h3>Try increasing the radius</h3>
                </div>
              )
            )}
          </>
        )}
      </div>
      <Button className="loadMore">Load More</Button>

      <div className="fixedButton">
        <Menu>
          <MenuButton as={Button} className="buttonFixed">
            <i className="fa fa-plus"></i>
          </MenuButton>
          <MenuList>
            <MenuItem>Create a New Gig</MenuItem>
            <MenuItem>Offer Services</MenuItem>
            <MenuItem>Report Bug</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <CurrentFeature />
    </>
  );
};

export default MainPage;
