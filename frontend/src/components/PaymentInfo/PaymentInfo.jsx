import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import PricingSummary from "./sidebar/PricingSummary";
// import PaymentSchedule from "./sidebar/PaymentSchedule";
// import PromoCode from "./sidebar/PromoCode";
// import RatingInfo from "./RatingInfo";
import PricingSummary from "../PricingSummary/PricingSummary";
import { usePaymentMutation } from "../../slices/userApiSlice";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useSelector } from "react-redux";
const stripePromise = loadStripe("pk_test_51O7dS4SHIO1unxwgswuNYztYDMSlYi3ZxhATV33YO0LiI6YXpYDgP4JkTaX4WRzU3NoH3eV2RdXR1ivZWDPTFKwB00kjXHNNVc");

const PaymentInfo = () => {
  const  bookingInfo  = useSelector((state) => state.booking);
  const [payment] = usePaymentMutation()
  const [itemsTabs, setItemsTabs] = useState(1);
  const [clientSecret, setClientSecret] = useState('');
  console.log('099',clientSecret);

  const handlePayment = async()=>{
    const response = await payment({price:bookingInfo.roomDetails.totalPrice,name:'Hotel Room'})
    console.log(response);
    setClientSecret(response.data.clientSecret)
    }

  const cardTabs = [
    { id: 1, name: "Credit/Debit Card" },
    { id: 2, name: "Digital Payment" }, 
  ];

  return (
    <>
      { clientSecret &&(
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}

      <div className="col-xl-7 col-lg-8">
        {/* <RatingInfo /> */}
        <div className="mt-40">
          <h3 className="text-22 fw-500 mb-20">How do you want to pay?</h3>
          <Tabs>
            <TabList className="row y-gap-20 x-gap-20">
              {cardTabs.map((item) => (
                <Tab
                  className="col-auto"
                  onClick={() => setItemsTabs(item.id)}
                  key={item.id}
                >
                  <button
                    className={
                      itemsTabs === item.id
                        ? "button -dark-1 bg-blue-1 text-white px-20 py-15"
                        : "button -blue-1 bg-light-2 px-20 py-15"
                    }
                  >
                    {item.name}
                  </button>
                </Tab>
              ))}
            </TabList>
            {/* End tablist */}

            <TabPanel>
              <div className="row x-gap-20 y-gap-20 pt-20">
                <div className="col-12">
                  <div className="form-input ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      Select payment method *
                    </label>
                  </div>
                </div>
                {/* End col */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      Card holder name *
                    </label>
                  </div>

                  <div className="form-input mt-20">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      Credit/debit card number *
                    </label>
                  </div>

                  <div className="row x-gap-20 y-gap-20 pt-20">
                    <div className="col-md-6">
                      <div className="form-input ">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Expiry date *
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-input ">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          CVC/CVV *         
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}
                </div>
                {/* End col */}
                <div className="col-md-6">
                  <img
                    src="/img/booking-pages/card.png"
                    alt="image"
                    className="h-full"
                  />
                </div>
                {/* End col */}
              </div>
              <button onClick={()=>handlePayment()}>Hi</button>
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
                      You have chosen to pay by PayPal. You will be forwarded to
                      the PayPal website to proceed with this transaction.
                    </li>
                    <li>The total amount you will be charged is: $2,338.01</li>
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
          
              <div className="col-auto" 
>
          <button
            className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
          >
            Pay Now <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
            </div>
          </div>
          {/* End col-auto */}
        </div>
        {/* End terms and conditons */}
      </div>
      {/* End payment details */}

      <div className="col-xl-5 col-lg-4">
        <div className="booking-sidebar">
           <PricingSummary />
          {/* <PaymentSchedule />
          <PromoCode />  */}
        </div>
      </div>
      {/* payment sidebar info */}
    </>
  );
};

export default PaymentInfo;
