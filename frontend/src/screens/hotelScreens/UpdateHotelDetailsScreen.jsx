import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import { UpdateHotelDetailsForm } from "../../components/UpdateHotelDetailsForm/UpdateHotelDetailsForm";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleHotelDataMutation } from "../../slices/hotelApiSlice";

const UpdateHotelDetailsScreen = () => {
    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);  
    const id = location.pathname.split("/")[3];
    console.log(id);
    const [singleHotelData] = useGetSingleHotelDataMutation();
  
    useEffect(() => {
      try {
        const fetchData = async () => {
          const responseFromApiCall = await singleHotelData({ id: id });
          const data = responseFromApiCall.data;
          setHotel(data);
          setLoading(false);
        };
  
        fetchData(); 
      } catch (error) {
        throw new Error('Error Fetching data')
      } 
    }, []);

    if(loading){
        return(
            <h1>Loading....</h1>
        )
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
                    <h1 className="text-30 lh-14 fw-600">Edit Hotel Details</h1>
                    <div className="text-15 text-light-1">
                      You can edit the details of your hotel here
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                
                  <UpdateHotelDetailsForm hotel={hotel} />
                </div>
              </> 

            <HotelFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHotelDetailsScreen;
