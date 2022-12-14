import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import { SimpleGrid, Box } from "@chakra-ui/react";
import GigCard from "../ components/GigCard";
import "../scss/searchResult.scss";
import { Navigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { searchAction } from "../actions/searchActions";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

const SearchResult = () => {
  const array = [1, 2, 3, 4, 5, 6];
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const searchResults = useSelector((state) => state.search);
  const { search, loading, error } = searchResults;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const locationBasedApiCall = (token) => {
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
        if (!searchQuery) {
          return;
        }

        dispatch(searchAction(searchQuery, long, lat, token));
      });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (searchQuery) {
        locationBasedApiCall(userInfo.token);
      }
    }
  }, [userInfo, searchQuery]);

  return (
    <>
      <NavbarMobile />
      <div className="gigList">
        {loading ? (
          <div className="loadingGig">
            {array.map((item) => (
              <Skeleton height="100%" className="skel" key={item} />
            ))}
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {typeof search !== "undefined" && (
              <>
                {search.length > 0 ? (
                  <div className="gigListContainer">
                    <h4 style={{ margin: "10px" }} className="gigListCard">
                      {search.length} Search Results for "{searchQuery}" Near
                      You.
                    </h4>
                    {search.map((s) => (
                      <GigCard key={s._id} gig={s} />
                    ))}
                  </div>
                ) : (
                  <div className="noGigs">
                    <h4>No Gigs Found</h4>
                    <p>
                      Try searching for something else or try again later. If
                      you are a seller, you can post a gig to get started.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* this  is a future feature */}
      {/* <SimpleGrid columns={2} spacing={4} margin={2}>
        {array.map((item) => {
          return <Box key={item} bg="gold" height="80px"></Box>;
        })}
      </SimpleGrid>
      <div className="pageNumbers">
        {array.map((item) => {
          return (
            <div className="pageNumber" key={item}>
              <a href="#">{item}</a>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default SearchResult;
