import React from "react";
import { useState } from "react";
import Slider from "react-slider";
import "./HotelSidebar.css";
export const HotelListSidebar = ({
  activeRating,
  setActiveRating,
  checkedAmenities,
  setCheckedAmenities,
  price,
  setPrice
}) => {
  const ratings = [1, 2, 3, 4, 5];
  const amenities = [
    { name: "Wifi" },
    { name: "SPA" },
    { name: "BAR" },
    { name: "CAB" },
    { name: "POOL" },
    { name: "GYM" },
  ];

  const handleRatingClick = (rating) => {
    setActiveRating(rating === activeRating ? null : rating);
  };

  const handleAmenityChange = (amenityName) => {
    if (checkedAmenities.includes(amenityName)) {
      setCheckedAmenities((prevChecked) =>
        prevChecked.filter((item) => item !== amenityName)
      );
    } else {
      setCheckedAmenities((prevChecked) => [...prevChecked, amenityName]);
    }
  };

  const handleSliderChange = (newValues) => setPrice(newValues);


  return (
    <>
      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price filter</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <div className="js-price-rangeSlider">
              <div className="text-14 fw-500"></div>

              <div className="d-flex justify-between mb-20">
                <div className="text-15 text-dark-1">
                  <span className="js-lower mx-1">₹ {price[0]}</span>-
                  <span className="js-upper mx-1">₹ {price[1]}</span>
                </div>
              </div>

              <div className="px-5">
                <Slider
                  className="slider"
                  value={price}
                  onChange={handleSliderChange}
                  min={0}
                  max={5000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Star Rating</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          {ratings.map((rating) => (
            <div className="col-auto" key={rating}>
              <button
                className={`button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100 ${
                  rating === activeRating ? "active" : ""
                }`}
                onClick={() => handleRatingClick(rating)}
              >
                {rating}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Amenities</h5>
        <div className="sidebar-checkbox">
          {amenities.map((amenity, index) => (
            <div
              className="row y-gap-10 items-center justify-between"
              key={index}
            >
              <div className="col-auto">
                <div className="form-checkbox d-flex items-center">
                  <input
                    type="checkbox"
                    checked={checkedAmenities.includes(amenity.name)}
                    onChange={() => handleAmenityChange(amenity.name)}
                  />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check" />
                  </div>
                  <div className="text-15 ml-10">{amenity.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* You can use checkedAmenities array in your filtering logic */}
      </div>
    </>
  );
};
