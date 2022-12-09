import React from "react";
import logo from "../Images/logo.svg";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../scss/LoginPage.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userAction";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
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
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   showToast(
    //     "Password must contain at least 8 characters, one uppercase, one lowercase and one number",
    //     "error"
    //   );
    //   return;
    // }

    dispatch(login(email, password));
  };

  //function to show toast
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
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={loading}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={loading}
            />
          </FormControl>

          <Button onClick={submitHandler} disabled={loading}>
            {loading && (
              <div className="spinner-border text-light" role="status">
                <i className="fa fa-circle-o-notch"></i>
              </div>
            )}
            Login
          </Button>
        </form>
        <Link to="/forgotpassword" className="forgotPassword">
          <p>Forgot Password?</p>
        </Link>
        <Link to="/getstarted">
          <p>Don't have an account? Sign Up</p>
        </Link>
        <div className="backgroundSvg"></div>
      </div>
    </>
  );
};

export default LoginPage;
