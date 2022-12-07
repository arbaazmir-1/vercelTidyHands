import React from "react";
import "../scss/CatagoriesMenu.scss";

const CatagoriesMenu = () => {
  return (
    <>
      <h2>Catagories</h2>
      <div className="catagories">
        <div className="iconContainer Cleaning">
          <i className="fas fa-broom  icon"></i>
          <p className="catagoryName">Cleaning</p>
        </div>
        <div className="iconContainer Delivery">
          <i className="fas fa-truck  icon"></i>
          <p className="catagoryName">Delivery</p>
        </div>
        <div className="iconContainer Gardening">
          <i className="fas fa-seedling icon"></i>
          <p className="catagoryName">Gardening</p>
        </div>
        <div className="iconContainer Moving">
          <i className="fas fa-truck-moving icon"></i>
          <p className="catagoryName">Moving</p>
        </div>
        <div className="iconContainer Tutoring">
          <i className="fas fa-chalkboard-teacher icon"></i>
          <p className="catagoryName">Tutoring</p>
        </div>
        <div className="iconContainer Painting">
          <i className="fas fa-paint-brush icon"></i>
          <p className="catagoryName">Painting</p>
        </div>
      </div>
    </>
  );
};

export default CatagoriesMenu;
