import HotelFooter from "../../components/HotelFooter/HotelFooter";
import { useState,useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import { FacilitiesManagement } from "../../components/FacilitiesManagement/FacilitiesManagement";
import AdminDashboardHeader from "../../components/AdminDashboardHeader/AdminDashboardHeader.jsx";

function FacilitiesManagementScreen() {

    const [loading, setLoading] = useState(false); 

      if(loading){
        return(
            <h1>Loading</h1>
        )
      }
    
  return (
    <>
    <div className="header-margin"></div>
    <AdminDashboardHeader/>

    {/* Header */}
    <div className="dashboard">
      <div className="dashboard__sidebar bg-white scroll-bar-1">
      <AdminSidebar/>

      </div>
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-2">
          <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
            <div className="col-12">
            <h1 className="text-30 lh-14 fw-600">Facilities Management</h1>
           
              <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <FacilitiesManagement/>
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

export default FacilitiesManagementScreen
