import React, { useState,useEffect } from "react";
import { useHotelRegisterMutation } from "../../slices/hotelApiSlice";
import { useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import { setHotelCredentials } from "../../slices/hotelAuthSlice";
function RegisterHotelier() {

const [register] = useHotelRegisterMutation()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotelInfo } = useSelector( (state) => state.hotelAuth );


  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function submitHandler(e){
    e.preventDefault();
    try {
      const responseFromApiCall = await register( { name,email, password } ).unwrap();
      dispatch(setHotelCredentials( { ...responseFromApiCall } ) );
      navigate('/Hotel/Details');

      } catch (err) {
        toast.error( err?.data?.message || err?.error );
      }
  }

  useEffect( () => {

    if(hotelInfo) {

      navigate('/Hotel/Details');

    }

  }, [ navigate, hotelInfo ] );
  return (
    <>
    <ToastContainer />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2"> 
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">

                    {/* Start  SignUP */}
                    <form className="row y-gap-20" onSubmit={submitHandler}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Hotel Registration</h1>
        <p className="mt-10">
          
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
           />
          <label className="lh-1 text-14 text-light-1">Name</label>
        </div>
      </div>
  
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" 
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password"  />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="d-flex ">
          
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
    <br /><br />

                {/* End SignUP */}

              
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterHotelier;
