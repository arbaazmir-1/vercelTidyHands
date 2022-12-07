import React from "react";
import logo from "../Images/logo.svg";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import backgroundSvg from "../Images/background.svg";
import "../scss/LoginPage.scss";
const LoginPage = () => {
  return (
    <>
      <div className="loginPage">
        <div className="logoLoginPage">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h2>Login</h2>
        </div>
        <form className="formLoginPage">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter Your Email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter Your Password" />
          </FormControl>
          <Link to="/main">
            <Button>Login</Button>
          </Link>
        </form>
        <Link to="/forgotpassword" className="forgotPassword">
          <p>Forgot Password?</p>
        </Link>
        <Link to="/signup">
          <p>Don't have an account? Sign Up</p>
        </Link>
        <div className="backgroundSvg"></div>
      </div>
    </>
  );
};

export default LoginPage;
