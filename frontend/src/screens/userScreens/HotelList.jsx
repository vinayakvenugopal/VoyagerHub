import Header1 from "../../components/UserNavbar/Header1";
import HotelListForUsers from "../../components/HotelListForUsers/HotelListForUsers";


function HotelList(){



  return (
    <>
    <Header1/>
    <div style={{marginTop:"65px"}}>
    <HotelListForUsers/>
    </div>

    </>
  )
}

export default HotelList
