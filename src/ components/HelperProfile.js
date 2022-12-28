import { Button, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "../scss/HelperProfile.scss";
import { Image, Grid, GridItem, Flex, Spacer } from "@chakra-ui/react";
import { useState } from "react";

const HelperProfile = (props) => {
  const { helper } = props;
  const { coords } = helper;
  let long1 = coords[0];
  let lat1 = coords[1];

  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long2 = position.coords.longitude;
        const lat2 = position.coords.latitude;
        const R = 6371e3; // metres
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((long2 - long1) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres
        //convert to km
        const dInKm = d / 1000;
        //check if km is less than 1
        if (dInKm < 1) {
          //convert to m
          const dInM = dInKm * 1000;
          setDistance(`${Math.round(dInM)} Meters Away `);
        } else {
          setDistance(`${Math.round(dInKm)} Kilometers Away `);
        }
      });
    }
  }, [lat1, long1]);

  return (
    <>
      <div className="helperProfileCard">
        <Grid templateColumns="1fr" gap={1}>
          <GridItem>
            {!helper.seller.avatar ? (
              <Image
                src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
                alt=""
                objectFit="contain"
                boxSize="200px"
              />
            ) : (
              <Image
                src={helper.seller.avatar}
                alt=""
                objectFit="contain"
                boxSize="200px"
              />
            )}
          </GridItem>
          <GridItem>
            <Flex>
              <h3>{helper.seller.name}</h3>
              <Spacer />
              <p>$10/hr</p>
            </Flex>
          </GridItem>
          <GridItem>
            <p>{distance}</p>
          </GridItem>

          <GridItem>
            <div className="helperProfileRating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return <i className="fas fa-star" key={i}></i>;
              })}
            </div>
          </GridItem>
        </Grid>

        {/* <div className="helperProfileImage">
          {!helper.seller.avatar ? (
            <Image
              src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
              alt=""
              objectFit="contain"
              boxSize="200px"
            />
          ) : (
            <Image
              src={helper.seller.avatar}
              alt=""
              objectFit="contain"
              boxSize="200px"
            />
          )}

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
        <p>{distance}</p> */}
      </div>
    </>
  );
};

export default HelperProfile;
