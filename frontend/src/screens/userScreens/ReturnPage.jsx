import { usePaymentStatusMutation,useCreateBookingMutation } from "../../slices/userApiSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ReturnPage = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentStatus] = usePaymentStatusMutation();
  const [createBooking] = useCreateBookingMutation()
  const bookingInfo  = useSelector((state) => state.booking);
  console.log(bookingInfo);

  useEffect(() => {
    async function fetchData() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");
      const response = await paymentStatus({ session_id: sessionId }).unwrap();
      console.log('ress',response);
      setStatus(response.status);
      setCustomerEmail(response.customer_details.email);
      const bookingResponse =  await createBooking({
        userInfo:bookingInfo.userInfo ,
        roomInfo:bookingInfo.roomDetails.room,
        hotelInfo:bookingInfo.hotelDetails,
        checkInDate:bookingInfo.roomDetails.checkinDate,
        checkOutDate:bookingInfo.roomDetails.checkoutDate,
        paymentStatus:response.status,
        bookingStatus:'Confirmed',
        totalAmount:response.amount_total,
        paymentId:response.id,
      }).unwrap()
    }
    fetchData();
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>        
      </section>
    ); 
  }

  return null;
};

export default ReturnPage;
