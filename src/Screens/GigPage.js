import React from "react";
import "../scss/GigPage.scss";
import NavWithBackBtn from "../ components/NavWithBackBtn";
import { Button } from "@chakra-ui/react";
const GigPage = () => {
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
              "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/[-77.043686,38.892035,-77.028923,38.904192]/400x400?access_token=" +
              "pk.eyJ1IjoiYXJiYWF6bWlyIiwiYSI6ImNsYjlwYm80NjAzYWYzbnFkemJsbmJ0aWEifQ.VT3jINrWalknubBpISn37w"
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
