import React from "react";
import "../scss/GigPage.scss";
import NavWithBackBtn from "../ components/NavWithBackBtn";
import { Button } from "@chakra-ui/react";

const GigPage = () => {
  let MAB_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN;

  return (
    <>
      <NavWithBackBtn />
      <div className="GigPage">
        <div className="gigCardPage">
          <div className="gigIconContainerPage">
            <i className="fas fa-broom"></i>
          </div>
          <div className="gigCardInfoPage">
            <h2>Cleaning the Yard</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl elit lacinia
            </p>
            <p>
              <i className="fas fa-star"></i>
              4.5
            </p>
          </div>
          <div className="priceContainer">
            <p>$20</p>
          </div>
        </div>
        <div className="gigCardPageDescription">
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nisl eget ultricies tincidunt, nisl elit lacinia libero,
            eget aliquam nisl nunc vel nisl. Sed tincidunt, nisl eget ultricies
            tincidunt, nisl elit lacinia libero, eget aliquam nisl
          </p>
        </div>
        <div className="mapContainer">
          <img
            src={
              "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(90.5831,23.7727),pin-l+ec0909(90.5831,23.7727)/90.5831,23.7727,12.91,0/500x500?access_token=" +
              process.env.REACT_APP_MAP_BOX_TOKEN
            }
            alt="location map"
          />

          <Button
            colorScheme="blue"
            variant="outline"
            className="mapBtn"
            onClick={() => {
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=38.892035,-77.043686"
              );
            }}
          >
            Open in Maps
          </Button>
        </div>

        <div className="footerSection">
          <Button>Chat Now</Button>
          <Button>Book Now</Button>
        </div>
      </div>
    </>
  );
};

export default GigPage;
