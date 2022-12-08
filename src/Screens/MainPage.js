import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import CatagoriesMenu from "../ components/CatagoriesMenu";
import { useEffect } from "react";
import GigCard from "../ components/GigCard";
import { useSelector, useDispatch } from "react-redux";
import { homepageAction } from "../actions/homepageAction";
import CurrentFeature from "../ components/currentFeature";
import HelperProfile from "../ components/HelperProfile";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homepage = useSelector((state) => state.homePage);
  const { loading, data } = homepage;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { token } = userInfo;

  let gigs, activeHelpers, gigsRadius, error;
  if (data) {
    gigs = data.gigs;
    activeHelpers = data.activeHelpers;
    gigsRadius = data.gigsRadius;
    error = data.error;
  }
  //push to "/" route if error === "Not authorized, no token"
  // if (error === "Not authorized, no token") {
  //   //show toast message
  //   toast.error("Please login to continue", {
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  //   // set delay to 3 seconds
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 3000);
  // }

  //get user long and lat and then dispatch action
  const locationBasedApiCall = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        //check if lang and lat are correct
        // const long = 101.60983276367188;
        // const lat = 4.823666572570801;
        if (lat > 90 || lat < -90 || long > 180 || long < -180) {
          return;
        }

        dispatch(homepageAction({ long, lat, token }));
      });
    }
  };
  useEffect(() => {
    locationBasedApiCall();
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <>
      <NavbarMobile />
      <ToastContainer />

      {loading ? (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          {typeof activeHelpers !== "undefined" && (
            <>
              <h4 style={{ margin: "10px" }} className="gigListCard">
                Helpers Near You
              </h4>
              <div className="profilesContainer">
                {activeHelpers.map((helper) => (
                  <HelperProfile key={helper._id} helper={helper} />
                ))}
              </div>
            </>
          )}
        </>
      )}
      <CatagoriesMenu />
      <div className="gigList">
        {loading ? (
          <div className="loading">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {typeof gigs !== "undefined" && (
              <>
                <h4 style={{ margin: "10px" }} className="gigListCard">
                  Gigs Near You
                </h4>
                {gigs.length > 0 ? (
                  <div className="gigListContainer">
                    {gigs.map((gig) => (
                      <GigCard key={gig._id} gig={gig} />
                    ))}
                  </div>
                ) : (
                  <div className="noGigs">
                    <h4>No Gigs Found</h4>
                    <p>
                      Try changing your location or search for a different
                      category
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className="currentFeature">
        <CurrentFeature />
      </div>
    </>
  );
};

export default MainPage;
