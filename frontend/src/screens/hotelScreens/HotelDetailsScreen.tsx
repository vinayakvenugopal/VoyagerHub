import HotelDashboardHeader from "../../components/HotelDasboardHeader/HotelDashboardHeader";
import { HotelDetailsForm } from "../../components/HotelDetailsForm/HotelDetailsForm";
import HotelFooter from "../../components/HotelFooter/HotelFooter";

const HotelDetailsScreen = () => {
  return (
    <>
      {/* <Seo pageTitle="Vendor Add Hotel" /> */}
      {/* End Page Title */}

      <div className="header-margin"></div>
      <HotelDashboardHeader/>
      {/* <Header /> */}
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          {/* <Sidebar /> */}
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Add Hotel Details</h1>
                <div className="text-15 text-light-1">
                  You should add the details of your hotel here
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <HotelDetailsForm />
            </div>

            <HotelFooter />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default HotelDetailsScreen;
