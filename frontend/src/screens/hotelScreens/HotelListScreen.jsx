import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import { HotelDetailsForm } from "../../components/HotelDetailsForm/HotelDetailsForm";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
import { useGetHotelListForHotelierMutation } from "../../slices/hotelApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HotelListForHotelier } from "../../components/HotelListForHotelier/HotelListForHotelier";

const HotelListScreen = () => {
  const [hotel, setHotel] = useState([]);

  const [loading, setLoading] = useState(true);
  const { hotelInfo } = useSelector((state) => state.hotelAuth); 

  const id = hotelInfo._id;
  const [hotelList] = useGetHotelListForHotelierMutation();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await hotelList({ id:id });
        const data = responseFromApiCall.data;
        setHotel(data);
        setLoading(false);
      };

      fetchData(); 
    } catch (error) {
      console.error("Error fetching users:", error);
    } 
  }, []);

  if (loading) {
    return <h1>Loading</h1>; 
  } 
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
                    <h1 className="text-30 lh-14 fw-600">Your Hotels</h1>
                    <div className="text-15 text-light-1">
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <HotelListForHotelier hotelsData={hotel}/>
                </div>
              </> 

            <HotelFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelListScreen;
