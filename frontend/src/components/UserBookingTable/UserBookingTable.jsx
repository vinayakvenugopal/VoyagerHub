import { useState } from "react";
// import Pagination from "../../common/Pagination";
// import ActionsButton from "../components/ActionsButton";
import { useSelector } from "react-redux";
import { useGetUserBookingsQuery,useUserCancelBookingMutation } from "../../slices/userApiSlice";
import dayjs from "dayjs";
const UserBookingTable = () => {
const { userInfo } = useSelector((state) => state.auth);
const id = userInfo._id
console.log(id);
const [cancelBooking] = useUserCancelBookingMutation()
const { data, isError, isLoading,refetch } = useGetUserBookingsQuery({ id: id });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Booking",
    "Completed",
    "Confirmed",
  ];

  const handleCancel = (id) =>{
    const response = cancelBooking({id})
    refetch()
  }
  if(isLoading){
    return(
        <h1>Loading...</h1>
    )
  }

  console.log(data);

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Hotel Name</th>
                    <th>Room</th>
                    <th>Booking Date</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  
                </thead>
                <tbody>
                {data.map((item,index)=>(           
                  <tr>
                    <td>{item.hotelInfo.name}</td>
                    <td>{item.roomInfo.type}</td>
                    <td>{dayjs(item.bookingDate).format("DD/MM/YYYY")}</td>
                    <td className="lh-16">
                      Check in : {dayjs(item.checkInDate).format("DD/MM/YYYY")}
                      <br />
                      Check out : {dayjs(item.checkOutDate).format("DD/MM/YYYY")}
                    </td>
                    <td className="fw-500">₹ {item.totalAmount}</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                      {item.bookingStatus}
                      </span>
                    </td>
                    <td>
                      {/* <ActionsButton /> */}
                      {item.bookingStatus=='Confirmed'?
                      <button className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white" onClick={()=>handleCancel(item._id)}>Cancel</button>:
                      null
                      }
                    </td>
                  </tr>
                  ))}

                  
          
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default UserBookingTable;
 