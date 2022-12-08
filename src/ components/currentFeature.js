import React from "react";
import { useState, useEffect } from "react";
import preval from "preval.macro";
import { Button } from "@chakra-ui/react";

const CurrentFeature = () => {
  const [timeDifference, setTimeDifference] = useState(0);

  const timeDiffFunc = () => {
    const lastUpdated = preval`module.exports = new Date().getTime();`;
    const now = new Date().getTime();

    const difference = now - lastUpdated;
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (minutes < 1) {
      setTimeDifference(`${seconds} seconds ago`);
    } else if (hours < 1) {
      setTimeDifference(`${minutes} minutes ago`);
    } else if (days < 1) {
      setTimeDifference(`${hours} hours ago`);
    } else {
      setTimeDifference(`${days} days ago`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => timeDiffFunc(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p style={{ margin: "10px" }} className="timer">
        Last Updated: {timeDifference}
      </p>
      <div className="currentFeatureList">
        <h4>Redesign on Progress,Current Features:</h4>
        <ul>
          <li>Navbar</li>
          <li>Profile List</li>
          <li>Catagories Menu</li>
          <li>Gig List</li>
          <li>Timer</li>

          <li>
            Backend
            <ol>
              <li>
                <i className="fa fa-check"></i>Authentication
              </li>
              <li>
                <i className="fa fa-circle-o-notch"></i>Authorization
              </li>
              <li>
                <i className="fa fa-circle-o-notch"></i>CRUD
              </li>
              <li>
                <i className="fa fa-check"></i>
                API
              </li>
              <li>
                <i className="fa fa-check"></i>
                Database
              </li>
              <li>
                <i className="fa fa-check"></i>
                Location Based Search
              </li>
              <li>
                <i className="fa fa-check"></i>
                Deployment Server (Vercel)
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentFeature;
