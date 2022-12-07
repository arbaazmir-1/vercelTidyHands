import React from "react";
import GetstartedSvg from "../ components/GetstartedSvg";
import logo from "../Images/logo.svg";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../scss/getStartedPage.scss";

const GetStartedPage = () => {
  return (
    <>
      <div className="mainContainerGetStarted">
        <div className="img">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="formContainer">
          <h2>
            Get Started <br /> Helpers are ready to help.
          </h2>
          <form>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type="text" placeholder="Enter your first name" />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" placeholder="Enter your last name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" placeholder="Enter your phone number" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Confirm your password" />
            </FormControl>
            <Link to="/main">
              <Button type="submit" colorScheme="blue" variant="solid">
                Get Started
              </Button>
            </Link>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
        <div className="bottomSection"></div>
      </div>
    </>
  );
};

export default GetStartedPage;
