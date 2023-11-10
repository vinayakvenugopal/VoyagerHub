import { usePaymentStatusMutation, useCreateBookingMutation } from "../../slices/userApiSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import InvoicePage from "../../components/InvoicePage/InvoicePage";
import Header1 from "../../components/UserNavbar/Header1";  

const ReturnPage = () => {
  const[isLoading,setIsLoading] = useState(true)
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentStatus] = usePaymentStatusMutation();
  const [createBooking] = useCreateBookingMutation();
  const bookingInfo = useSelector((state) => state.booking);
  // const [redirectTimer, setRedirectTimer] = useState(20);
  const [bookingId,setBookingId] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");
      const response = await paymentStatus({ session_id: sessionId }).unwrap();
      setStatus(response.status);
      setCustomerEmail(response.customer_details.email);
      const bookingResponse = await createBooking({
        userInfo: bookingInfo.userInfo,
        roomInfo: bookingInfo.roomDetails.room,
        hotelInfo: bookingInfo.hotelDetails,
        checkInDate: bookingInfo.roomDetails.checkinDate,
        checkOutDate: bookingInfo.roomDetails.checkoutDate,
        paymentStatus: response.status,
        bookingStatus: 'Confirmed',
        totalAmount: bookingInfo.roomDetails.totalPrice,
        paymentId: response.id,
      }).unwrap();
      setBookingId(bookingResponse._id)
      setIsLoading(false)
    }
    fetchData();

  }, []);


  if(isLoading){
    return(
      <h1>Loading....</h1>
    )
  }

 

  if (status === "complete"&&isLoading==false) {
    return (
    <>
      <Header1/>
      <InvoicePage id={bookingId} />
      </>
    );
  }

  return null;
};

export default ReturnPage;
