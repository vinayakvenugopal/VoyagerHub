import React from "react";
import { Link } from "react-router-dom";
import { useGetSingleBookingQuery } from "../../slices/userApiSlice";
import dayjs from "dayjs";
import { usePDF } from "react-to-pdf";

const InvoicePage = ({ id }) => {
  const { data, isError, isLoading } = useGetSingleBookingQuery({ id: id });
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  console.log(data);
  const date1 = new Date(data.checkInDate);
  const date2 = new Date(data.checkOutDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <section className="layout-pt-lg layout-pb-lg bg-blue-2">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-10 col-lg-11">
            <div className="d-flex justify-end">
              <Link
                to="/"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1 me-3"
              >
                Back to Home
              </Link>
              <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" onClick={() => toPDF()}>
                Print
                <i className="icon-bed text-20 ml-10" />
              </button>
            </div>
            <div ref={targetRef}>
              <div className="bg-white rounded-4 mt-50">
                <div className="layout-pt-lg layout-pb-lg px-50">
                  <div className="row justify-between">
                    <div className="col-auto">
                      <img
                        src="/logo.png"
                        alt="logo icon"
                        width={"75px"}
                        height={"75px"}
                      />
                    </div>
                    <div className="col-xl-4">
                      <div className="row justify-between items-center">
                        <div className="col-auto">
                          <div className="text-26 fw-600">Invoice #</div>
                        </div>
                        <div className="col-auto">
                          <div className="text-18 fw-500 text-light-1">
                            0043128641
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-between pt-50">
                    <div className="col-auto">
                      <div className="text-15 text-light-1">Invoice date:</div>
                      <div className="text-15 fw-500 lh-15">
                        {" "}
                        {dayjs(data.bookingDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="text-15 text-light-1">Check-In Date:</div>
                      <div className="text-15 fw-500 lh-15">
                        {dayjs(data.checkInDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="col-xl-4" style={{ marginLeft: "69%" }}>
                      <div className="text-15 text-light-1">
                        Check-Out Date:
                      </div>
                      <div className="text-15 fw-500 lh-15">
                        {dayjs(data.checkOutDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="row justify-between pt-50">
                    <div className="col-auto">
                      <div className="text-20 fw-500">Hotel</div>
                      <div className="text-15 fw-500 mt-20">
                        {data.hotelInfo.name}
                      </div>
                      <div className="text-15 text-light-1 mt-10">
                        {data.hotelInfo.address}
                        <br /> {data.hotelInfo.city}
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="text-20 fw-500">Customer</div>
                      <div className="text-15 fw-500 mt-20">
                        {data.userInfo.name}
                      </div>
                      <div className="text-15 text-light-1 mt-10">
                        {data.userInfo.address} <br />
                        {data.userInfo.locality}
                      </div>
                    </div>
                  </div>
                  <div className="row pt-50">
                    <div className="col-12">
                      <table className="table col-12">
                        <thead className="bg-blue-1-05 text-blue-1">
                          <tr>
                            <th>Room Type</th>
                            <th>Price</th>
                            <th>No of Days</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{data.roomInfo.type}</td>
                            <td>₹ {data.roomInfo.price}</td>
                            <td>{diffDays}</td>
                            <td>₹ {data.totalAmount}</td>
                          </tr>

                          <tr>
                            <td className="text-18 fw-500">Total Amount</td>
                            <td />
                            <td />
                            <td className="text-18 fw-500">
                              ₹ {data.totalAmount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="border-top-light py-50">
                  <div className="row x-gap-60 y-gap-10 justify-center">
                    <div className="col-auto">
                      <a href="#" className="text-14">
                        www.voyagerhub.com
                      </a>
                    </div>
                    <div className="col-auto">
                      <a href="#" className="text-14">
                        invoice@voyagerhub.com
                      </a>
                    </div>
                    <div className="col-auto">
                      <a href="#" className="text-14">
                        +91 99999999
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InvoicePage;
