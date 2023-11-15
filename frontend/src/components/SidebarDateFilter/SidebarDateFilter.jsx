import DatePicker, { DateObject } from "react-multi-date-picker";
import { useState } from "react";

const SidebarDateFilter = ({setCheckIn,setCheckOut,checkAvailability}) => {
  const [dates, setDates] = useState([
    new DateObject(),
    new DateObject(),
  ]);
  const checkAvailable = ()=>{
    if(dates[0]){
      const checkInDate =  dates[0].toDate();
      setCheckIn(checkInDate)
    }
    if(dates[1]){
      const checkOutDate = dates[1].toDate();
      setCheckOut(checkOutDate)
  
    }
    checkAvailability()
  }
  return (
    <div className="ml-50 lg:ml-0">
      <div className="px-30 py-30 border-light rounded-4 shadow-4">
        <div className="d-flex items-center justify-between">
          <div>
            <span className="text-20 fw-500">{}</span>
            <span className="text-14 text-light-1 ml-5"></span>
          </div>
          <div className="d-flex items-center">
           
         
          </div>
        </div>
        {/* End d-flex */}

        <div className="row y-gap-20 pt-30">
          <div className="col-12">
            <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
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
              <button className="button -dark-1 px-35 h-60 col-12 bg-blue-1 text-white" onClick={()=>checkAvailable()}>
                Check availability
              </button>
            </div>
            {/* End search button_item */}
          </div>
          {/* End .col-12 */}
        </div>
      </div>
      {/* End px-30 FilterBox */}
    </div>
  );
};

export default SidebarDateFilter;
