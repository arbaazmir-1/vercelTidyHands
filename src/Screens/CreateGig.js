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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState([]);

  const [timeLimit, setTimeLimit] = useState("");

  const locationBasedApiCall = async () => {
    let long, lat;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        if (lat > 90 || lat < -90 || long > 180 || long < -180) {
          return;
        }
        setLocation([long, lat]);
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
            <Input
              placeholder="Title Of Your Gig"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description Of Your Gig"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Price Of Your Gig"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl id="gig-category" isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select option"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="cleaning">Cleaning</option>
              <option value="delivery">Delivery</option>
              <option value="gardening">Gardening</option>
              <option value="handyman">Handyman</option>
              <option value="moving">Moving</option>
              <option value="pet">Pet</option>
              <option value="photography">Photography</option>
              <option value="tech">Tech</option>
              <option value="tutoring">Tutoring</option>
              <option value="writing">Writing</option>
              <option value="other">Other</option>
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
          <FormControl id="gig-timeLimit">
            <FormLabel>Time Limit</FormLabel>
            <Input
              type="date"
              placeholder="Time Limit"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
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
