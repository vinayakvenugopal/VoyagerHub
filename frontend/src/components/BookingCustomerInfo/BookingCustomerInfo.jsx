import { Link } from "react-router-dom";
import BookingDetailsSidebar from "../BookingDetailsSidebar/BookingDetailsSidebar";
import { useGetDetailsForBookingQuery } from "../../slices/userApiSlice";
import { useState } from "react";
import { setUserInfo,setHotelDetails,setRoomDetails } from "../../slices/bookingSlice";
import { useDispatch,useSelector } from "react-redux";
import {toast} from 'react-toastify'


const BookingCustomerInfo = ({nextStep}) => {
    const reservationData = localStorage.getItem('reservation')
    const reservation = JSON.parse(reservationData)
    const { userInfo } = useSelector((state) => state.auth);
    const  bookingInfo  = useSelector((state) => state.booking);
    const [name,setName] = useState(userInfo.name)
    const [email,setEmail] = useState(userInfo.email)
    const [mobile,setMobile] = useState('')
    const [address,setAddress] = useState('')  
    const [locality,setLocality] = useState('') 
    const [pincode,setPincode] = useState('')
    const [state,setState] = useState('')
    const [country,setCountry] = useState('')
     const dispatch = useDispatch()
    const user ={
      id:userInfo._id,
      name,
      email,
      mobile,
      address,
      locality,
      pincode, 
      state,
      country
    }



    console.log(bookingInfo);

    // const {data,error,isLoading,refetch} = useGetDetailsForBookingQuery({hotelId:reservation.hotelId,availabilityId:reservation.availabilityId})
    const handleSubmit = ()=>{
      // if(name.trim()==0){
      //   toast.error("Name Must be filled")
      //   return
      // }
      // if(email.trim()==0){
      //   toast.error("Email Must be filled")
      //   return
      // }
      // if(mobile.trim()==0){
      //   toast.error("Mobile Must be filled")
      //   return
      // }
      // if(address.trim()==0){
      //   toast.error("Address Must be filled")
      //   return
      // }
      // if(locality.trim()==0){
      //   toast.error("Locality Must be filled")
      //   return
      // }

      // if(state.trim()==0){
      //   toast.error("State Must be filled")
      //   return
      // }
      // if(pincode.trim()==0){
      //   toast.error("Pincode Must be filled")
      //   return
      // }
      // if(country.trim()==0){
      //   toast.error("Country Must be filled")
      //   return
      // }
      
      
      const payload = {
        userInfo: userInfo,

      };
      dispatch(setUserInfo(user));
      nextStep()
    }
    const roomDetails = bookingInfo.roomDetails
    const hotelDetails = bookingInfo.hotelDetails
    

    // useEffect(() => {
    //   // Dispatch user, hotel, and room details to Redux when data is available
    //   if (data) {
    //     const payload = {
    //       userInfo: userInfo, // user is the user data you retrieved
    //       hotelDetails: data.hotelDetails,
    //       roomDetails: data.roomDetails,
    //     };
    //     dispatch(setBookingDetails(payload));
    //   }
    // }, [data]);

    

  return (
    <>
    
      <div className="col-xl-7 col-lg-8 mt-30">
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
          Sign in to book with your saved details or{" "}
          <Link to="/others-pages/signup" className="text-blue-1 fw-500">
            register
          </Link>{" "}
          to manage your bookings on the go!
        </div>
        {/* End register notify */}
        <h2 className="text-22 fw-500 mt-40 md:mt-24">
          Let us know who you are
        </h2>

        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className="col-12">
            <div className="form-input ">
              <input type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
               />
              <label className="lh-1 text-16 text-light-1">Full Name</label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input type="text"
               value={email}
              onChange={(e)=>setName(e.target.value)}
               />
              <label className="lh-1 text-16 text-light-1">Email</label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input type="text" 
               value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
              
               />
              <label className="lh-1 text-16 text-light-1">Phone Number</label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <input type="text" 
               value={address}
              onChange={(e)=>setAddress(e.target.value)}
               />
              <label className="lh-1 text-16 text-light-1">
                Address
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <input type="text" 
               value={locality}
                onChange={(e)=>setLocality(e.target.value)} />
              <label className="lh-1 text-16 text-light-1">
                Locality
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input type="text" 
               value={state}
              onChange={(e)=>setState(e.target.value)} />
              <label className="lh-1 text-16 text-light-1">
                State/Province/Region
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input type="number"
               value={pincode}
                onChange={(e)=>setPincode(e.target.value)}  />
              <label className="lh-1 text-16 text-light-1">
                ZIP code/Postal code
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-input ">
              <input type="text" 
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
               />
              <label className="lh-1 text-16 text-light-1">
                Country
              </label>
            </div>
          </div>
          {/* End col-12 */}

          {/* <div className="col-12">
            <div className="form-input ">
              <textarea required rows={6} defaultValue={""} />
              <label className="lh-1 text-16 text-light-1">
                Special Requests
              </label>
            </div>
          </div> */}
          {/* End col-12 */}

          <div className="col-12">
            <div className="row y-gap-20 items-center justify-between">
              <div className="col-auto">
                <div className="text-14 text-light-1">
         
                </div>
              </div>
              {/* End col-12 */}
            </div>
          </div>
          {/* End col-12 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}   

      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          <BookingDetailsSidebar roomDetails={roomDetails} hotelDetails={hotelDetails} />
        </div>
      </div>
      <div className="col-auto">
      <button className="button h-60 px-24 -dark-1 bg-blue-1 text-white" onClick={()=>handleSubmit()}>Next <div className="icon-arrow-top-right ml-15" /></button>
      </div>
      {/*  */}
    </>
  );
};

export default BookingCustomerInfo;
