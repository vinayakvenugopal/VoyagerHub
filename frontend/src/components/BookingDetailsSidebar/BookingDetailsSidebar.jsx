
import dayjs from 'dayjs'
const BookingDetailsSidebar = ({roomDetails,hotelDetails}) => {

  console.log(roomDetails);
  return (
    <div className="px-30 py-30 border-light rounded-4">
      <div className="text-20 fw-500 mb-30">Your booking details</div>
      <div className="row x-gap-15 y-gap-20">
        <div className="col-auto">
          <image
            width={140}
            height={140}
            src="/img/backgrounds/1.png"
            alt="image"
            className="size-140 rounded-4 object-cover"
          />
        </div>
        {/* End .col */}
        <div className="col">
          <div className="d-flex x-gap-5 pb-10">
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
          </div>
          {/* End ratings */}
          <div className="lh-17 fw-500">
            {hotelDetails.name}
          </div>
          <div className="text-14 lh-15 mt-5">{hotelDetails.address}</div>
          {/* <div className="row x-gap-10 y-gap-10 items-center pt-10">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="size-30 flex-center bg-blue-1 rounded-4">
                  <div className="text-12 fw-600 text-white">4.8</div>
                </div>
                <div className="text-14 fw-500 ml-10">Exceptional</div>
              </div>
            </div>
            <div className="col-auto">
              <div className="text-14">3,014 reviews</div>
            </div>
          </div> */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}

      <div className="border-top-light mt-30 mb-20" />
      <div className="row y-gap-20 justify-between">
        <div className="col-auto">
          <div className="text-15">Check-in</div>
          <div className="fw-500"> {dayjs(roomDetails.checkinDate).format("DD/MM/YYYY")}</div>
          <div className="text-15 text-light-1">12:00 pm</div>
        </div>
        <div className="col-auto md:d-none">
          <div className="h-full w-1 bg-border" />
        </div>
        <div className="col-auto text-right md:text-left">
          <div className="text-15">Check-out</div>
          <div className="fw-500">{dayjs(roomDetails.checkoutDate).format("DD/MM/YYYY")}</div>
          <div className="text-15 text-light-1">11:00 am</div>
        </div>
      </div>
      {/* End row */}

      <div className="border-top-light mt-30 mb-20" />
      <div>
        <div className="text-15">Total length of stay:</div>
        <div className="fw-500">{roomDetails.numberOfDays} nights</div>
      
      </div>

      <div className="border-top-light mt-30 mb-20" />
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-auto">
          <div className="text-15">You selected:</div>
          <div className="fw-500">{roomDetails.room.type}</div>
        </div>
        <div className="col-auto">
          <div className="text-15">1 room, {roomDetails.room.occupancy} adult</div>
        </div>
      </div>
      {/* End row */}
    </div>
    // End px-30
  );
};

export default BookingDetailsSidebar;
