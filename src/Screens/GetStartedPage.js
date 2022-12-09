import React from "react";
import logo from "../Images/logo.svg";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../scss/getStartedPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GetStartedPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();
  const registerUserFunc = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      showToast("Please fill all the fields", "error");
      return;
    }
    //email validation
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email", "error");
      return;
    }
    //password validation
    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    //phone number validation
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      showToast("Please enter a valid phone number", "error");
      return;
    }
    let fullName = firstName + " " + lastName;
    dispatch(register(fullName, email, password, phoneNumber));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/main");
    }
  }, [userInfo]);
  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  const showToast = (message, type) => {
    return toast(message, {
      type: type,
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
              <Input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              variant="solid"
              onClick={registerUserFunc}
              disabled={loading}
            >
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <i className="fa fa-circle-o-notch"></i>
                </div>
              )}
              Get Started
            </Button>

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
