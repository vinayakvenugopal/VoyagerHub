import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import { HotelDetailsForm } from "../../components/HotelDetailsForm/HotelDetailsForm";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddHotelDetailsScreen = () => {
  const [hotel, setHotel] = useState([]);
  console.log(hotel);

  const [loading, setLoading] = useState(true);
  const { hotelInfo } = useSelector((state) => state.hotelAuth); 


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
                    <h1 className="text-30 lh-14 fw-600">Add Hotel Details</h1>
                    <div className="text-15 text-light-1">
                      You should add the details of your hotel here
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                
                  <HotelDetailsForm />
                </div>
              </> 

            <HotelFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHotelDetailsScreen;
