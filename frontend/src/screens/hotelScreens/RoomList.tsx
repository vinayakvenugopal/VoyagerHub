import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import RoomListHotel from "../../components/RoomListHotel/RoomListHotel";
import { useGetRoomDataForHotelMutation } from "../../slices/hotelApiSlice";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
function RoomList() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
    const [room,setRoom] = useState<any>([])
    console.log(room);
    
    const [getRoomDataForHotel]:any = useGetRoomDataForHotelMutation()

    const [loading, setLoading] = useState(true); 
    const { hotelInfo } = useSelector( (state:any) => state.hotelAuth );

    useEffect(() => {
    
        try {
         
            const hotelierId = hotelInfo._id
          const fetchData = async () => { 
            const response = await getRoomDataForHotel({hotelierId});
            const roomData = response.data;            
            setRoom(roomData);
            setLoading(false)
          };
      
          fetchData();
        } catch (error:any) {
          console.error("Error fetching users:", error);
    
        }
    
      }, []);


      if(loading){
        return(
            <h1>Loading</h1>
        )
      }
    
  return (
    <>
<AddRoomModal showModal={showModal} setShowModal={setShowModal}/>
    <div className="header-margin"></div>
    <HotelDashboardHeader/>
    <div className="dashboard">
      <div className="dashboard__sidebar bg-white scroll-bar-1">
      <HotelSidebar/>

      </div>
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-2">
          <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
            <div className="col-12">

              <h1 className="text-30 lh-14 fw-600">Rooms</h1>
              <button class="btn btn-warning" style={{marginTop:"10px",marginLeft:'980px'}} onClick={handleOpenModal}>Add Room</button>
              <div className="py-30 px-30 rounded-4 bg-white shadow-3" style={{marginTop:"10px"}}>
                <RoomListHotel room={room}/>
              </div>
            </div>
          </div>
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
          </div>
          <HotelFooter />
        </div>
      </div>
    </div>

  </>
  )
}

export default RoomList
