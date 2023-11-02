import { usePaymentStatusMutation } from "../../slices/userApiSlice";
import { useState, useEffect } from "react";
const ReturnPage = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentStatus] = usePaymentStatusMutation();

  useEffect(() => {
    async function fetchData() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");
      const response = await paymentStatus({ session_id: sessionId });
      setStatus(response.data.status);
      setCustomerEmail(response.data.customer_email);
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
