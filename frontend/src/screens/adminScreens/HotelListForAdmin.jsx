import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import RoomListHotel from "../../components/RoomListHotel/RoomListHotel";
import { useAdminGetHotelsMutation } from "../../slices/adminApiSlice";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import { HotelListAdmin } from "../../components/HotelListAdmin/HotelListAdmin";

function HotelListForAdmin() {
 const [hotelsData,setHotelsData] = useState([])
const[refetch,setRefetch] = useState(false)
    const [HotelData] = useAdminGetHotelsMutation()

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
    
        try {
         
            const fetchData = async () => { 
            const response = await HotelData({});
            const hotelsData = response.data;            
            setHotelsData(hotelsData);
            setLoading(false)
          };
      
          fetchData();
        } catch (error) {
          throw new Error('An error occured')
    
        }
    
    }, [refetch]);


      if(loading){
        return(
            <h1>Loading</h1>
        )
      }
    
  return (
    <>
    <div className="header-margin"></div>
    {/* <HotelDashboardHeader/> */}
    <div className="dashboard">
      <div className="dashboard__sidebar bg-white scroll-bar-1">
      <AdminSidebar/>

      </div>
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-2">
          <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
            <div className="col-12">
            <h1 className="text-30 lh-14 fw-600" style={{marginLeft:"40%"}}>Hotels</h1>
              <div className="py-30 px-30 rounded-4 bg-white shadow-3" style={{marginTop:"10px"}}>
                <HotelListAdmin hotelsData={hotelsData} refetch={refetch} setRefetch={setRefetch}/>
              </div>
            </div>
          </div>
         
          <HotelFooter />
        </div>
      </div>
    </div>

  </>
  )
}

export default HotelListForAdmin
