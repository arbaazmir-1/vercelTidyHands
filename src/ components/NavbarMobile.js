import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.svg";
import { Input, Avatar } from "@chakra-ui/react";
import "../scss/mainPage.scss";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import "../scss/navbarMobile.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userAction";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const NavbarMobile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //check if show full search bar or not
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [searchItem, setSearchItem] = useState("");

  // function to show/hide search bar
  const searchBarToggle = () => {
    setShowSearchBar(!showSearchBar);
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  if (userInfo) {
    if (!userInfo.avatar) {
      userInfo.avatar =
        "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg";
    }
  }
  const logoutCall = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      navigate("/");
    }
  }, [userInfo, isLogged, navigate]);

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="light" mb="1rem">
              Are you sure you want to logout?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                logoutCall();
                onClose();
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="navBar">
        <div className="logo">
          <Link to="/main">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="rightSide">
          <div className="searchbar">
            {showSearchBar ? (
              <Input
                type="text"
                placeholder="Search for a service"
                className="searchInput"
                onBlur={searchBarToggle}
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && searchItem !== "") {
                    navigate("/search?query=" + searchItem);
                  }
                }}
              />
            ) : (
              <i className="fas fa-search" onClick={searchBarToggle}></i>
            )}
          </div>
          <div className="profileAvatar">
            <Menu>
              <MenuButton>
                {userInfo !== null ? (
                  <Avatar
                    size="sm"
                    name={userInfo.name}
                    src={userInfo.avatar}
                  />
                ) : (
                  <Avatar size="sm" />
                )}
              </MenuButton>
              <MenuList>
                {isLogged ? (
                  <>
                    <MenuItem>Welcome {userInfo.name}</MenuItem>
                    <MenuItem>
                      <Link to="/profile">Profile</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link to="/addservice">Add Service</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={"/usergig/" + userInfo._id}>Your Listings</Link>
                    </MenuItem>

                    <Button
                      style={{ width: "100%" }}
                      colorScheme="red"
                      onClick={onOpen}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <MenuItem>
                    <Link to="/login">Login</Link>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
