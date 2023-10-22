import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import RoomListHotel from "../../components/RoomListHotel/RoomListHotel";
import { useGetRoomDataForHotelQuery } from "../../slices/hotelApiSlice";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
function RoomList() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    const id = location.pathname.split("/")[3];

    const {data:room,error,isLoading,refetch} = useGetRoomDataForHotelQuery({id:id})
    console.log(room);
    const refetchData=()=>{
      console.log('refetching...........');
      refetch()
    }


      if(isLoading){
        return(
            <h1>Loading</h1>
        )
      }
  return (
    <>
<AddRoomModal showModal={showModal} setShowModal={setShowModal} id={id} refetchData={refetchData}/>
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
              <div style={{width:"100%"}} className="d-flex justify-content-end">
              <button className="btn btn-warning" onClick={handleOpenModal}>Add Room</button>
              </div>
              <div className="py-30 px-30 rounded-4 bg-white shadow-3" style={{marginTop:"10px"}}>
                <RoomListHotel room={room} refetchData={refetchData} />
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

export default RoomList
