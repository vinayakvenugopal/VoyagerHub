import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
  useGetBookingsForHotelQuery,
  useChangeBookingStatusMutation,
} from "../../slices/hotelApiSlice";
import dayjs from "dayjs";
import Pagination from "../Pagination/Pagination";
import { usePDF } from "react-to-pdf";

const HotelBookingTable = () => {
  const { toPDF, targetRef } = usePDF({ filename: "report.pdf" });
  const [dates, setDates] = useState([new DateObject(), new DateObject()]);
  const [startDate, setStartDate] = useState(new DateObject().toDate());
  const [endDate, setEndDate] = useState(new DateObject().toDate());
  const searchStartDate = new Date(startDate.setHours(5, 30, 0, 0));
  const searchEndDate = new Date(endDate.setHours(5, 30, 0, 0));

  const filterDate = () => {
    if (dates[0]) {
      const checkInDate = dates[0].toDate();
      setStartDate(checkInDate);
    }
    if (dates[1]) {
      const checkOutDate = dates[1].toDate();
      setEndDate(checkOutDate);
    }
  };

  const id = location.pathname.split("/")[3];
  const { data, isError, isLoading, refetch } = useGetBookingsForHotelQuery({
    id: id,
  });
  const [changeStatus] = useChangeBookingStatusMutation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = ["All Booking", "Confirmed", "Cancelled", "Date Wise"];

  const [activeFilter, setActiveFilter] = useState("");

  const handleStatusChange = async (id, status, userId) => {
    const response = await changeStatus({
      id: id,
      status: status,
      userId: userId,
    });
    refetch();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
  }

  const hi = data.filter((item) => {
    console.log(item.checkInDate);
    return item.checkInDate === startDate;
  }).length;
  console.log(hi);

  const filters = [
    { label: "Details", value: "details" },
    { label: "Invoice", value: "invoice" },
  ];
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
            {activeTab === 3 && (
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4">
                    <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
                      <div>
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                          Start Date - End Date
                        </h4>
                        <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
                          <DatePicker
                            inputClass="custom_input-picker"
                            containerClassName="custom_container-picker"
                            value={dates}
                            onChange={setDates}
                            numberOfMonths={2}
                            offsetY={10}
                            range
                            rangeHover
                            format="MMMM DD YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="button -dark-1 px-35 h-60 bg-blue-1 text-white h-full"
                      onClick={() => filterDate()}
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-md-2">
                  <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" onClick={() => toPDF()}>
                Download Report
                <i className="icon-bed text-20 ml-10" />
              </button>
              </div>
                </div>
              </div>
            )}

            <br />
            <div className="overflow-scroll scroll-bar-1" ref={targetRef}>
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Customer Name</th>
                    <th>Room</th>
                    <th>Booking Date</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    {activeTab===3 || <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 0 &&
                    data.slice(startIndex, endIndex).map((item, index) => (
                      <tr>
                        <td>{item.userInfo.name}</td>
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
                          <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-success text-white">
                            {item.bookingStatus}
                          </span>
                        </td>
                        {item.bookingStatus == "Confirmed" && (
                          <button
                            className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                            onClick={() =>
                              handleStatusChange(
                                item._id,
                                "Cancelled",
                                item.userInfo.id
                              )
                            }
                          >
                            Cancel
                          </button>
                        )}
                        {item.bookingStatus == "Cancel Requested" && (
                          <>
                            <button
                              className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                              onClick={() =>
                                handleStatusChange(
                                  item._id,
                                  "Cancelled",
                                  item.userInfo.id
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                              onClick={() =>
                                handleStatusChange(
                                  item._id,
                                  "Cancel Rejected",
                                  item.userInfo.id
                                )
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {item.bookingStatus == "Cancelled" ||
                          ("Cancel Rejected" && null)}

                        <td>{}</td>
                      </tr>
                    ))}
                </tbody>

                {activeTab === 1 && (
                  <tbody>
                    {data
                      .filter((item) => item.bookingStatus === "Confirmed")
                      .slice(startIndex, endIndex)
                      .map((item, index) => (
                        <tr>
                          <td>{item.userInfo.name}</td>
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
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-success text-white">
                              {item.bookingStatus}
                            </span>
                          </td>
                          {item.bookingStatus == "Confirmed" && (
                            <button
                              className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                              onClick={() =>
                                handleStatusChange(
                                  item._id,
                                  "Cancelled",
                                  item.userInfo.id
                                )
                              }
                            >
                              Cancel
                            </button>
                          )}
                          {item.bookingStatus == "Cancel Requested" && (
                            <>
                              <button
                                className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                                onClick={() =>
                                  handleStatusChange(
                                    item._id,
                                    "Cancelled",
                                    item.userInfo.id
                                  )
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                                onClick={() =>
                                  handleStatusChange(
                                    item._id,
                                    "Cancel Rejected",
                                    item.userInfo.id
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {item.bookingStatus == "Cancelled" ||
                            ("Cancel Rejected" && null)}

                          <td>{}</td>
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
                          <td>{item.userInfo.name}</td>
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
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-success text-white">
                              {item.bookingStatus}
                            </span>
                          </td>
                          {item.bookingStatus == "Confirmed" && (
                            <button
                              className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                              onClick={() =>
                                handleStatusChange(item._id, "Cancelled")
                              }
                            >
                              Cancel
                            </button>
                          )}
                          {item.bookingStatus == "Cancel Requested" && (
                            <>
                              <button
                                className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                                onClick={() =>
                                  handleStatusChange(item._id, "Cancelled")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3"
                                onClick={() =>
                                  handleStatusChange(
                                    item._id,
                                    "Cancel Rejected"
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {item.bookingStatus == "Cancelled" ||
                            ("Cancel Rejected" && null)}

                          <td>{}</td>
                        </tr>
                      ))}
                  </tbody>
                )}

                {activeTab === 3 && (
                  <tbody>
                    {data
                      .filter((item) => {
                        const checkInDate = dayjs(item.checkInDate).toDate();
                        const checkOutDate = dayjs(item.checkOutDate).toDate();
                        return (
                          (checkInDate >= searchStartDate &&
                            checkInDate <= searchEndDate) ||
                          (checkOutDate >= searchStartDate &&
                            checkOutDate <= searchEndDate) ||
                          (checkInDate <= searchStartDate &&
                            checkOutDate >= searchEndDate)
                        )
                      })
                      .map((item, index) => (
                        <tr>
                          <td>{item.userInfo.name}</td>
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
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-success text-white">
                              {item.bookingStatus}
                            </span>
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

export default HotelBookingTable;
