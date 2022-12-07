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
const MainPage = () => {
  const dispatch = useDispatch();

  const homepage = useSelector((state) => state.homePage);
  const { loading, error, data } = homepage;
  const { gigs, activeHelpers } = data;

  //get user long and lat and then dispatch action
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(long, lat);
        dispatch(homepageAction({ long, lat }));
      });
    }
  }, [dispatch]);

  return (
    <>
      <NavbarMobile />
      <h4 style={{ margin: "10px" }}>Helpers Around You!</h4>
      <div className="profilesContainer">
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner"></i>
          </div>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            {typeof activeHelpers !== "undefined" && (
              <>
                {activeHelpers.map((helper) => (
                  <HelperProfile key={helper._id} helper={helper} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      <CatagoriesMenu />
      <h4 style={{ margin: "10px" }}>Gigs Around You!</h4>
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
                {gigs.map((gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </>
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
