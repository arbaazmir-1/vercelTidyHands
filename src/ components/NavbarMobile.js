import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.svg";
import { Input, Avatar } from "@chakra-ui/react";
import "../scss/mainPage.scss";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import "../scss/navbarMobile.scss";

const NavbarMobile = (props) => {
  //check if show full search bar or not
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  // function to show/hide search bar
  const searchBarToggle = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <div className="navBar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="rightSide">
          <div className="searchbar">
            {showSearchBar ? (
              <Input
                type="text"
                placeholder="Search for a service"
                className="searchInput"
                onBlur={searchBarToggle}
              />
            ) : (
              <i className="fas fa-search" onClick={searchBarToggle}></i>
            )}
          </div>
          <div className="profileAvatar">
            <Menu>
              <MenuButton as={Avatar}></MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/login">Login</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/getstarted">Sign Up</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
