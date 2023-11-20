import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import HotelFooter from "../../components/HotelFooter/HotelFooter";
import HotelSidebar from "../../components/HotelSidebar/HotelSidebar";
import HotelierChat from "../../components/HotelierChat/HotelierChat";


const HotelierChatScreen = () => {

  return (
    <>
      <div className="header-margin"></div>
      <HotelDashboardHeader />
      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <HotelSidebar />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
              <>
              
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <HotelierChat/>
                </div>
              </> 

            <HotelFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelierChatScreen;
