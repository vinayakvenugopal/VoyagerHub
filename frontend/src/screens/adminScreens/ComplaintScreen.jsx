 import HotelFooter from "../../components/HotelFooter/HotelFooter";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import ComplaintsTable from "../../components/ComplaintsTable/ComplaintsTable.jsx";
import AdminDashboardHeader from "../../components/AdminDashboardHeader/AdminDashboardHeader.jsx";
function ComplaintScreen() {


  return (
    <>
    <div className="header-margin"></div>
    <AdminDashboardHeader/>

    <div className="dashboard">
      <div className="dashboard__sidebar bg-white scroll-bar-1">
      <AdminSidebar/>

      </div>
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-2">
          <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
            <div className="col-12">
            <h1 className="text-30 lh-14 fw-600" style={{marginLeft:"40%"}}>Complaints</h1>
              <div className="py-30 px-30 rounded-4 bg-white shadow-3" style={{marginTop:"10px"}}>
              <ComplaintsTable/>
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

export default ComplaintScreen
