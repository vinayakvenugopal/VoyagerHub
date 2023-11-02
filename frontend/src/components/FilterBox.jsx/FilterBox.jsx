import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";


const FilterBox = () => {
    const [dates, setDates] = useState([
        new DateObject().setDay(15),
        new DateObject().setDay(14).add(1, "month"),
      ]);
      if(dates[0]){
        const checkInDate = dates[0].toDate();
        console.log('checkin'+checkInDate);
      }
      if(dates[1]){
        const checkOutDate = dates[1].toDate();
        console.log('checkout'+checkOutDate);

      }
  return (
    <>
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Check in - Check out</h4>
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
        format="MMMM DD YYYY"
      />
    </div>
          </div>
        </div>
        {/* End check-in-out */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        {/* <GuestSearch /> */}
        {/* End guest */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <div className="button-item h-full">
          <button className="button -dark-1 px-35 h-60 col-12 bg-blue-1 text-white">
            Check availability
          </button>
        </div>
        {/* End search button_item */}
      </div>
      {/* End .col-12 */}
    </>
  );
};

export default FilterBox;