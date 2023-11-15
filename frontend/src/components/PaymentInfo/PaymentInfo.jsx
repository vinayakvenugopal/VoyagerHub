import { useState } from "react";
import { Tabs, TabPanel } from "react-tabs";
import { unwrapResult } from '@reduxjs/toolkit';

import PricingSummary from "../PricingSummary/PricingSummary";
import { usePaymentMutation,useWalletPaymentMutation } from "../../slices/userApiSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const stripePromise = loadStripe(
  "pk_test_51O7dS4SHIO1unxwgswuNYztYDMSlYi3ZxhATV33YO0LiI6YXpYDgP4JkTaX4WRzU3NoH3eV2RdXR1ivZWDPTFKwB00kjXHNNVc"
);
import { useNavigate } from "react-router-dom";

const PaymentInfo = ({previousStep}) => {
  const navigate = useNavigate()
  const bookingInfo = useSelector((state) => state.booking);
  const user = bookingInfo.userInfo;
  const room = bookingInfo.roomDetails
  console.log(room);
  const [payment] = usePaymentMutation();
  const [walletPayment] = useWalletPaymentMutation();

  const [clientSecret, setClientSecret] = useState("");

  const handlePayment = async () => {
    const response = await payment({
      price: bookingInfo.roomDetails.totalPrice,
      name: "Hotel Room",
    });
    setClientSecret(response.data.clientSecret);
  };


  const handleWalletPayment = async () => {
      const response =  walletPayment({
        userInfo: bookingInfo.userInfo,
        roomInfo: bookingInfo.roomDetails.room,
        hotelInfo: bookingInfo.hotelDetails,
        checkInDate: bookingInfo.roomDetails.checkinDate,
        checkOutDate: bookingInfo.roomDetails.checkoutDate,
        paymentStatus: 'complete',
        bookingStatus: 'Confirmed',
        totalAmount: bookingInfo.roomDetails.totalPrice,
      }).unwrap().then((data)=>{
        const id = data.id
        navigate(`/invoice?bookingId=${id}`)
      }).catch((error)=>{
        toast.error(error.data.message)
      })

    
  };


  const handleSubmit = ()=>{
    previousStep()
  }

  return (
    <>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <>
          <div className="col-xl-7 col-lg-8">
            {/* <RatingInfo /> */}
            <div className="mt-40">
              <Tabs>
                <TabPanel>
                  <div className="border-light rounded-8 px-50 py-40 mt-40">
                    <h4 className="text-20 fw-500 mb-30">Your Information</h4>
                    <div className="row y-gap-10">
                      <div className="col-12">
                        <div className="d-flex justify-between ">
                          <div className="text-15 lh-16">Name</div>
                          <div className="text-15 lh-16 fw-500 text-blue-1">
                            {user?.name}
                          </div>
                        </div>
                      </div>

                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">Email</div>
                          <div className="text-15 lh-16 fw-500 text-blue-1">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">Phone</div>
                          <div className="text-15 lh-16 fw-500 text-blue-1">
                            {user?.mobile}
                          </div>
                        </div>
                      </div>
                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">Address</div>
                          <div className="text-15 lh-16 fw-500 text-blue-1" />
                          {user?.address}
                        </div>
                      </div>
                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">Locality</div>
                          <div className="text-15 lh-16 fw-500 text-blue-1" />
                          {user?.locality}
                        </div>
                      </div>
                      {/* End .col */}
                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">
                            State/Province/Region
                          </div>
                          <div className="text-15 lh-16 fw-500 text-blue-1" />
                          {user?.state}
                        </div>
                      </div>
                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">
                            ZIP code/Postal code
                          </div>
                          <div className="text-15 lh-16 fw-500 text-blue-1" />
                          {user?.pincode}
                        </div>
                      </div>
                      {/* End .col */}
                      <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">Country</div>
                          <div className="text-15 lh-16 fw-500 text-blue-1">
                            {user?.country}
                          </div>
                        </div>
                      </div>
                      {/* End .col */}
                      {/* <div className="col-12">
                        <div className="d-flex justify-between border-top-light pt-10">
                          <div className="text-15 lh-16">
                            Special Requirements
                          </div>
                          <div className="text-15 lh-16 fw-500 text-blue-1" />
                        </div>
                      </div> */}
                      {/* End .col */}
                    </div>
                    {/* End .row */}
                  </div>

                  {/* End .row */}
                </TabPanel>
                {/* credit debit info */}

                <TabPanel>
                  <div className="mt-60 md:mt-32">
                    <div className="mt-20">
                      <div className="form-input ">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Select payment method *
                        </label>
                      </div>
                    </div>
                    <div className="mt-20">
                      <ul className="list-disc y-gap-4 text-15 text-light-1">
                        <li>
                          You have chosen to pay by PayPal. You will be
                          forwarded to the PayPal website to proceed with this
                          transaction.
                        </li>
                        <li>
                          The total amount you will be charged is: $2,338.01
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End mt60 */}
                </TabPanel>
                {/* End digital payment */}
              </Tabs>
            </div>
            {/* End mt-40 */}

            <div className="w-full h-1 bg-border mt-40 mb-40" />

            <div className="row y-gap-20 items-center justify-between">
              <div className="col-auto">
                <div className="form-checkbox d-flex items-center">
                  <input type="checkbox" name="name" />

                  <div className="col-auto"></div>
                </div>
              </div>
              {/* End col-auto */}
            </div>
            {/* End terms and conditons */}
          </div>
          {/* End payment details */}

          <div className="col-xl-5 col-lg-4">
            <div className="booking-sidebar">
              <PricingSummary room={room} />
              <br />
              <button className="button h-60 px-24 -dark-1 bg-blue-1 text-white" onClick={() => handlePayment()}>Pay Now <div className="icon-arrow-top-right ml-15" /></button>
                      <br />
                      <button className="button h-60 px-24 -dark-1 bg-blue-1 text-white" onClick={() => handleWalletPayment()}>Pay Using Wallet <div className="icon-arrow-top-right ml-15" /></button>

              {/* <PaymentSchedule />
          <PromoCode />  */}
            </div>
          </div>
        </>
      )}
      <div className="col-auto">
      <button className="button h-60 px-24 -dark-1 bg-blue-1 text-white" onClick={()=>handleSubmit()}>Previous</button>
      </div>
      {/* payment sidebar info */}
    </>
  );
};

export default PaymentInfo;
