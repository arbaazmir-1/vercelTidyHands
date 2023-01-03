import React, { useEffect } from "react";
import "../scss/GigPage.scss";
import NavWithBackBtn from "../ components/NavWithBackBtn";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gigViewAction } from "../actions/gigAction";

const GigPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const gig = useSelector((state) => state.gig);
  const { loading, error, data } = gig;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { token } = userInfo;

  useEffect(() => {
    dispatch(gigViewAction(id, token));
  }, [dispatch, id]);

  let MAB_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN;
  const needWithTime = (time) => {
    //formate time in social media style
    let timeNow = new Date();
    let timeGig = new Date(time);
    let timeDiff = timeNow - timeGig;
    let timeDiffInSec = timeDiff / 1000;
    let timeDiffInMin = timeDiffInSec / 60;
    let timeDiffInHour = timeDiffInMin / 60;
    let timeDiffInDay = timeDiffInHour / 24;
    let timeDiffInWeek = timeDiffInDay / 7;
    let timeDiffInMonth = timeDiffInWeek / 4;
    let timeDiffInYear = timeDiffInMonth / 12;
    if (timeDiffInSec < 60) {
      return "Just now";
    }
    if (timeDiffInMin < 60) {
      return `${Math.round(timeDiffInMin)} minutes ago`;
    }
    if (timeDiffInHour < 24) {
      return `${Math.round(timeDiffInHour)} hours ago`;
    }
    if (timeDiffInDay < 7) {
      return `${Math.round(timeDiffInDay)} days ago`;
    }
    if (timeDiffInWeek < 4) {
      return `${Math.round(timeDiffInWeek)} weeks ago`;
    }
    if (timeDiffInMonth < 12) {
      return `${Math.round(timeDiffInMonth)} months ago`;
    }
    if (timeDiffInYear > 1) {
      return `${Math.round(timeDiffInYear)} years ago`;
    }
  };

  return (
    <>
      <NavWithBackBtn />
      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : data.title ? (
        <div className="GigPage">
          <div className="gigCardPage">
            <div className="gigIconContainerPage">
              {data.category === "Cleaning" ? (
                <i className="fas fa-broom"></i>
              ) : data.category === "Delivery" ? (
                <i className="fas fa-truck"></i>
              ) : data.category === "Moving" ? (
                <i className="fas fa-truck-moving"></i>
              ) : data.category === "Tutoring" ? (
                <i className="fas fa-chalkboard-teacher"></i>
              ) : data.category === "Gardening" ? (
                <i className="fas fa-seedling"></i>
              ) : data.category === "Handyman" ? (
                <i className="fas fa-tools"></i>
              ) : data.category === "Pet Care" ? (
                <i className="fas fa-paw"></i>
              ) : data.category === "Tech Support" ? (
                <i className="fas fa-laptop"></i>
              ) : data.category === "Other" ? (
                <i className="fas fa-question"></i>
              ) : (
                <i className="fas fa-question"></i>
              )}
            </div>
            <div className="gigCardInfoPage">
              <h2>{data.title}</h2>
              <p>
                {data.category} | | {needWithTime(data.needWithin)}
              </p>
              <p>
                Posted By <span>{data.buyer.name}</span>
              </p>
            </div>
            <div className="priceContainer">
              <p>$20</p>
            </div>
          </div>
          <div className="gigCardPageDescription">
            <h2>Description</h2>
            <p>{data.description}</p>
          </div>
          <div className="mapContainer">
            <img
              src={
                `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(${data.coords[0]},${data.coords[1]})/${data.coords[0]},${data.coords[1]},15.08,0/1280x1280?access_token=` +
                process.env.REACT_APP_MAP_BOX_TOKEN
              }
              alt="location map"
            />

            <Button
              colorScheme="blue"
              variant="outline"
              className="mapBtn"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=38.892035,-77.043686"
                );
              }}
            >
              Open in Maps
            </Button>
          </div>

          <div className="footerSection">
            <Button>Chat Now</Button>
            <Button>Book Now</Button>
          </div>
        </div>
      ) : (
        <div className="error">
          <p>Something went wrong</p>
        </div>
      )}
    </>
  );
};

export default GigPage;
