import React from "react";
import NavWithBackBtn from "../ components/NavWithBackBtn";
import "../scss/helperProfilePage.scss";
import { Badge, Wrap, WrapItem, Button } from "@chakra-ui/react";

const HelpersProfilePage = () => {
  return (
    <>
      <NavWithBackBtn />
      <div className="helperProfilePage">
        <div className="helperProfileCardPage">
          <div className="imgHelper">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="helper"
            />
          </div>
          <div className="helperInfo">
            <h2>John Doe</h2>
            <p>College Student</p>
            <p>
              <i className="fas fa-star"></i>
              {""}
              4.5
            </p>
          </div>
          <div className="priceTag">
            <h2>
              $20/ <span>Hour</span>
            </h2>
          </div>
        </div>
        <hr />
        <div className="descriptionHelper">
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            impedit modi numquam maxime temporibus saepe debitis deserunt
            voluptates quia ad aut molestias at maiores eius doloribus quos est
            unde corporis? Optio inventore quibusdam adipisci deserunt, odit ad.
          </p>
        </div>
        <div className="servicesOffered">
          <div className="iconContainer">
            <i className="fa fa-handshake-o"></i>
          </div>
          <div className="serviceBadge">
            <h2>Services Offered</h2>
            <Wrap>
              <WrapItem>
                <Badge colorScheme="red">Cooking</Badge>
              </WrapItem>
              <WrapItem>
                <Badge colorScheme="red">Cleaning</Badge>
              </WrapItem>
              <WrapItem>
                <Badge colorScheme="red">Grocery Shopping</Badge>
              </WrapItem>
            </Wrap>
          </div>
        </div>
        <div className="footerSection">
          <Button>Chat Now</Button>
          <Button>Book Now</Button>
        </div>
      </div>
    </>
  );
};

export default HelpersProfilePage;
