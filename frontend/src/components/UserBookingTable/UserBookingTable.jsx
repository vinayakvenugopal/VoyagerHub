import { useState } from "react";
// import Pagination from "../../common/Pagination";
// import ActionsButton from "../components/ActionsButton";
import { useSelector } from "react-redux";
import {
  useGetUserBookingsQuery,
  useUserCancelBookingMutation,
} from "../../slices/userApiSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination.jsX";
import { FaRocketchat } from "react-icons/fa";

const UserBookingTable = ({handleChat }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const id = userInfo._id;
  const [cancelBooking] = useUserCancelBookingMutation();
  const { data, isError, isLoading, refetch } = useGetUserBookingsQuery({
    id: id,
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = ["All Booking", "Confirmed", "Cancelled"];

  const handleCancel = (id) => {
    const response = cancelBooking({ id });
    refetch();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;



const handleChatClick = (userId,hotelierId) =>{
  handleChat(userId,hotelierId)
}




  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  let length;
  if (activeTab === 0) {
    length = data.length;
  } else if (activeTab === 1) {
    length = data.filter((item) => item.bookingStatus === "Confirmed").length;
  } else if (activeTab === 2) {
    length = data.filter((item) => item.bookingStatus === "Cancelled").length;
    console.log("length", length);
  }

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
                    <th>Invoice</th>
                    <th>Action</th>
                    <th>Chat</th>
                  </tr>
                </thead>
                {activeTab === 0 && (
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => (
                      <tr>
                        <td>{item.hotelInfo.name}</td>
                        <td>{item.roomInfo.type}</td>
                        <td>{dayjs(item.bookingDate).format("DD/MM/YYYY")}</td>
                        <td className="lh-16">
                          Check in :{" "}
                          {dayjs(item.checkInDate).format("DD/MM/YYYY")}
                          <br />
                          Check out :{" "}
                          {dayjs(item.checkOutDate).format("DD/MM/YYYY")}
                        </td>
                        <td className="fw-500">₹ {item.totalAmount}</td>
                        <td>
                          <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                            {item.bookingStatus}
                          </span>
                        </td>
                        <td>
                          {item.bookingStatus == "Confirmed" && (
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                navigate(`/invoice?bookingId=${item._id}`)
                              }
                            >
                              View
                            </button>
                          )}
                        </td>
                        <td>
                          {/* <ActionsButton /> */}
                          {item.bookingStatus == "Confirmed" ? (
                            <button
                              className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white"
                              onClick={() => handleCancel(item._id)}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </td>
                        <td>
                          <button>
                            <FaRocketchat onClick={() => handleChatClick(item.userInfo.id , item.hotelInfo.hotelierId)} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {activeTab === 1 && (
                  <tbody>
                    {data
                      .filter((item) => item.bookingStatus === "Confirmed")
                      .slice(startIndex, endIndex)
                      .map((item, index) => (
                        <tr>
                          <td>{item.hotelInfo.name}</td>
                          <td>{item.roomInfo.type}</td>
                          <td>
                            {dayjs(item.bookingDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="lh-16">
                            Check in :{" "}
                            {dayjs(item.checkInDate).format("DD/MM/YYYY")}
                            <br />
                            Check out :{" "}
                            {dayjs(item.checkOutDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="fw-500">₹ {item.totalAmount}</td>
                          <td>
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                              {item.bookingStatus}
                            </span>
                          </td>
                          <td>
                            {item.bookingStatus == "Confirmed" && (
                              <button
                                className="btn btn-secondary"
                                onClick={() =>
                                  navigate(`/invoice?bookingId=${item._id}`)
                                }
                              >
                                View
                              </button>
                            )}
                          </td>
                          <td>
                            {/* <ActionsButton /> */}
                            {item.bookingStatus == "Confirmed" ? (
                              <button
                                className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white"
                                onClick={() => handleCancel(item._id)}
                              >
                                Cancel
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}

                {activeTab === 2 && (
                  <tbody>
                    {data
                      .filter((item) => item.bookingStatus === "Cancelled")
                      .slice(startIndex, endIndex)
                      .map((item, index) => (
                        <tr>
                          <td>{item.hotelInfo.name}</td>
                          <td>{item.roomInfo.type}</td>
                          <td>
                            {dayjs(item.bookingDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="lh-16">
                            Check in :{" "}
                            {dayjs(item.checkInDate).format("DD/MM/YYYY")}
                            <br />
                            Check out :{" "}
                            {dayjs(item.checkOutDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="fw-500">₹ {item.totalAmount}</td>
                          <td>
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                              {item.bookingStatus}
                            </span>
                          </td>
                          <td>
                            {/* <ActionsButton /> */}
                            {item.bookingStatus == "Confirmed" ? (
                              <button
                                className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white"
                                onClick={() => handleCancel(item._id)}
                              >
                                Cancel
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        totalPages={Math.ceil(length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default UserBookingTable;
