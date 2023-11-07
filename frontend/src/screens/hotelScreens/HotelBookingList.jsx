import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
import { useEffect, useState } from "react";
import HotelBookingTable from "../../components/HotelBookingTable/HotelBookingTable";

const HotelBookingList = () => {
  const [hotel, setHotel] = useState([]);

  return (
    <>
    {/* <EditHotel/> */}
      <div className="header-margin"></div>
      <HotelDashboardHeader />
      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <HotelSidebar />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
              <>
                <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
                  <div className="col-12">
                    <h1 className="text-30 lh-14 fw-600">Your Bookings</h1>
                    <div className="text-15 text-light-1">
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <HotelBookingTable/>
                </div>
              </> 

            <HotelFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelBookingList;
