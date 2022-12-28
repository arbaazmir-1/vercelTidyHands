import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import {
  Center,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
const CreateGig = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const locationBasedApiCall = async () => {
    let long, lat;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        if (lat > 90 || lat < -90 || long > 180 || long < -180) {
          return;
        }
        console.log(lat, long);
        setLoading(true);
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.REACT_APP_MAP_BOX_TOKEN}`
          )
          .then((res) => {
            console.log(res.data.features[0].place_name);
            setAddress(res.data.features[0].place_name);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <NavbarMobile />
      <Grid templateColumns=" 1fr" gap={6} margin={5}>
        <GridItem colSpan={1}>
          <Center>
            <h1>Create Gig</h1>
          </Center>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder="Title Of Your Gig" />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input placeholder="Description Of Your Gig" />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input placeholder="Price Of Your Gig" />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-category" isRequired>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select option">
              <option value="option1">Cleaning</option>
              <option value="option2">Delivery</option>
              <option value="option3">Gardening</option>
              <option value="option4">Handyman</option>
              <option value="option5">Moving</option>
              <option value="option6">Painting</option>
              <option value="option7">Photography</option>
              <option value="option8">Tutoring</option>
              <option value="option9">Other</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-location" isRequired>
            <FormLabel>Location</FormLabel>
            <Button
              width="full"
              onClick={locationBasedApiCall}
              title="Most Accurate Location That We Can Get"
            >
              Get Current Location
            </Button>

            {loading && <p>Loading...</p>}
            {error && <p>Error</p>}
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>{address && <p>{address}</p>}</GridItem>
        <GridItem colSpan={1}>
          <FormControl id="gig-image">
            <FormLabel>Image</FormLabel>
            <Input type="file" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl id="gig-timeLimit">
            <FormLabel>Time Limit</FormLabel>
            <Input type="date" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <Button width="full" colorScheme="teal" type="submit">
            Submit
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default CreateGig;
