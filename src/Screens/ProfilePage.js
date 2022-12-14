import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, GridItem } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../actions/userAction";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Grid,
  Center,
} from "@chakra-ui/react";
import "../scss/profilePage.scss";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo.token));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
      }
    }
  }, [userInfo, navigate, dispatch, user]);

  return (
    <>
      <NavbarMobile />
      {loading ? (
        <Grid gap={2} margin={2}>
          <GridItem>
            <SkeletonCircle size="10" />
          </GridItem>
          <GridItem>
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </GridItem>
        </Grid>
      ) : error ? (
        <div className="profilePage">
          <h1>{error}</h1>
        </div>
      ) : (
        <>
          {editable ? (
            <div className="profileInfoEdit">
              <h1>Edit Profile</h1>
              <form>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder={name}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder={user.email}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="text"
                    placeholder={user.phone}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    placeholder={user.address}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <Button>Update</Button>
                <Button
                  onClick={() => {
                    setEditable(!editable);
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
          ) : (
            <div className="profileInfoShow">
              <div className="userImg">
                <img src={userInfo.avatar} alt="" />
              </div>

              <h1 className="profileInfoShow__title">{userInfo.name}</h1>
              <h3>{userInfo.email}</h3>
              <h3>{phone}</h3>
              <h3>{address}</h3>

              <Button
                onClick={() => {
                  setEditable(!editable);
                }}
              >
                Edit Button
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
