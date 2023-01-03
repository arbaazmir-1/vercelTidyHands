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
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../scss/CreateGig.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { set } from "mongoose";

const CreateGig = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState([]);
  const [placHolder, setPlaceHolder] = useState("I need help with cleaning");
  const [fading, setFading] = useState(false);
  const [loadingGig, setLoadingGig] = useState(false);
  const [errorGig, setErrorGig] = useState(false);
  const [successGig, setSuccessGig] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { token } = userInfo;

  const placeHolderArray = [
    "I need help with cleaning",
    "I need help with delivery",
    "I need help with gardening",
  ];

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
  const submitGig = async () => {
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      location.length === 0 ||
      !timeLimit
    ) {
      toast.error("Please fill in all the fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoadingGig(true);
      try {
        let data = await axios.post(
          "/api/gigs/crud",
          {
            title,
            description,
            price,
            location,
            category,

            timeLimit,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLoadingGig(false);
        if (data) {
          setSuccessGig(true);
          toast.success("Gig created successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (err) {
        setLoadingGig(false);
        setErrorGig(err);
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    setFading(true);
    setTimeout(() => {
      // change the placeholder chronologically every 5 seconds to the next one
      setPlaceHolder(
        placeHolderArray[
          placeHolderArray.indexOf(placHolder) + 1 === placeHolderArray.length
            ? 0
            : placeHolderArray.indexOf(placHolder) + 1
        ]
      );

      setFading(false);
    }, 5000);
  });
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
              placeholder={placHolder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fading ? "fading" : "notFading"}
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
          <Button
            width="full"
            colorScheme="teal"
            type="submit"
            onClick={submitGig}
            disabled={loadingGig}
          >
            {loadingGig && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="md"
              />
            )}
            Submit
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default CreateGig;
