import React, { useEffect, useState } from 'react'
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useNavigate } from 'react-router-dom';

export const HomeSearchBox = () => {
    const navigate=useNavigate()
    const [searchValue,setSearchValue] = useState("")
    const [checkInDate,setCheckInDate] = useState(null)
    const [checkOutDate,setCheckOutDate] = useState(null)

    const [dates, setDates] = useState([
      new DateObject(),
      new DateObject(),
    ]);
    useEffect(()=>{
      if(dates[0]){
        setCheckInDate(dates[0].toDate());
      }
      if(dates[1]){
        setCheckOutDate(dates[1].toDate())
      } 
    },[dates[0],dates[1]])
    

    
      
    return (
    <div className="position-relative mt-30 md:mt-20 js-tabs-content">
    <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
      <div className="button-grid items-center">
        {/* <LocationSearch /> */}

        <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        {/* End location Field */}

      
      </div>

        <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">
              Check in - Check out
            </h4>

            <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={setDates}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
      />
    </div>
            
          </div>
        </div>

        {/* <GuestSearch /> */}

        <div className="button-item">
          <button
            className="mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-blue-1 text-white"
            onClick={() =>navigate(`/hotels?name=${searchValue}&checkinDate=${checkInDate}&checkoutDate=${checkOutDate}`)}
          >
            <i className="icon-search text-20 mr-10" />
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
