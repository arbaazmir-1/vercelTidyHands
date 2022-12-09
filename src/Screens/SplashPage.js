import React from "react";
import SplashScreenSvg from "../ components/SplashScreenSvg";
import logo from "../Images/logo.svg";
import { Link } from "react-router-dom";
import "../scss/SplashPage.scss";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const arrayText = [
    {
      title: "Get Helpers to do your work",
      para: "From cleaning your house to watering your plants. We have someone for your tasks.",
    },
    {
      title: "Use Your Skills to Earn Money",
      para: "Use your free time to earn money. We have a lot of tasks for you. Easy and simple.",
    },
    {
      title: "Get your work done",
      para: "Don't worry about your work. We have someone for your tasks. Just sit back and relax.",
    },
  ];
  const [text, setText] = useState(arrayText[0]);
  //change text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setText(arrayText[Math.floor(Math.random() * arrayText.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [arrayText]);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/main");
    }
  }, [userInfo, navigate]);

  return (
    <>
      {isVisible && (
        <Alert status="error">
          <AlertIcon />

          <AlertDescription>
            This webapp is meant to be used on mobile devices. Please use a
            mobile device to view this webapp or wait for the desktop version to
            be released.
          </AlertDescription>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={toggleVisibility}
          />
        </Alert>
      )}
      <div className="mainContainerSplashScreen">
        <div className="topSection">
          <img src={logo} alt="" />
        </div>
        <div className="imageSection">
          <SplashScreenSvg className="svg" />
        </div>
        <div className="textCarousel">
          <div>
            <h1>{text.title}</h1>
            <p>{text.para}</p>
          </div>
        </div>

        <Link to="/login" className="btn">
          <Button>Get Started</Button>
        </Link>
        <p className="privacyNotice">
          By signing up, you agree to our <span>Terms of Service</span> and{" "}
          <span>Privacy Policy</span>
        </p>
      </div>
    </>
  );
};

export default SplashPage;
