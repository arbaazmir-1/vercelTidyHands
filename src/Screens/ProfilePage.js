import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
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
      if (!user.name) {
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
            <SkeletonCircle size="150px" isLoaded={!loading}>
              <img src={user.avatar} alt="" />
            </SkeletonCircle>
          </div>
          <SkeletonText mt="4" noOfLines={3} spacing="4" isLoaded={!loading}>
            <h1 className="profileInfoShow__title">{user.name}</h1>
            <h3>{user.email}</h3>
            <h3>{user.phone}</h3>
            <h3>{user.address}</h3>
          </SkeletonText>
          <Skeleton isLoaded={!loading}>
            <Button
              onClick={() => {
                setEditable(!editable);
              }}
            >
              Edit Button
            </Button>
          </Skeleton>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
