import React from "react";
import GigCard from "./GigCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allGigs } from "../actions/gigAction";
import "../scss/gigList.scss";

const GigList = () => {
  const arrayList = [1, 2, 3, 4, 5, 6, 7];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allGigs());
  }, [dispatch]);

  const data = useSelector((state) => state.gigList);
  const { loading, error, gigs } = data;
  console.log(gigs);

  return (
    <>
      <div className="gigList">
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner"></i>
          </div>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default GigList;
