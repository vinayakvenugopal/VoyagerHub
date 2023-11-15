
  const DashboardCard = ({data}) => {
    return (
      <div className="row y-gap-30">
          <div className="col-xl-3 col-md-6">
            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <div className="row y-gap-20 justify-between items-center">
                <div className="col-auto">
                  <div className="fw-500 lh-14">Total Earnings</div>
                  <div className="text-26 lh-16 fw-600 mt-5">₹ {data[0].totalBookingAmount}</div>
                  <div className="text-15 lh-14 text-light-1 mt-5">
                  </div>
                </div>
                <div className="col-auto">
                  <img src="/img/dashboard/icons/1.svg" alt="icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <div className="row y-gap-20 justify-between items-center">
                <div className="col-auto">
                  <div className="fw-500 lh-14">Total Bookings</div>
                  <div className="text-26 lh-16 fw-600 mt-5">{data[0].totalBookings}</div>
                  <div className="text-15 lh-14 text-light-1 mt-5">
                  </div>
                </div>
                <div className="col-auto">
                  <img src="/img/dashboard/icons/3.svg" alt="icon" />
                </div>
              </div>
            </div>
          </div>
          
      </div>
    );
  };
  
  export default DashboardCard;
  