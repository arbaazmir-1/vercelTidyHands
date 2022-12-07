import React from "react";
import GigCard from "./GigCard";

const GigList = () => {
  const arrayList = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div className="gigList">
        {arrayList.map((item) => {
          return <GigCard key={item} />;
        })}
      </div>
    </>
  );
};

export default GigList;
