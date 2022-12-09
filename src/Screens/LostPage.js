import React from "react";
import "../scss/lostPage.css";
import { Link } from "react-router-dom";
const LostPage = () => {
  return (
    <>
      <div className="notFoound">
        <section className="notFound">
          <div className="img">
            <img
              src="https://assets.codepen.io/5647096/backToTheHomepage.png"
              alt="Back to the Homepage"
            />
            <img
              src="https://assets.codepen.io/5647096/Delorean.png"
              alt="El Delorean, El Doc y Marti McFly"
            />
          </div>
          <div className="text">
            <h1>404</h1>
            <h2>PAGE NOT FOUND </h2>
            <h3>BACK TO HOME?</h3>

            <Link to="/main" className="yes">
              Yes
            </Link>
            <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
            <p className="credit">
              Credit:{" "}
              <a href="https://codepen.io/eduardo_alejandro">
                Eduardo Alejandro
              </a>
              <p>
                The page you are looking for might be under construction or
                doesn't exist.
              </p>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default LostPage;
