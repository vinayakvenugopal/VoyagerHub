import React, { useState, useEffect } from "react";
import { useHotelRegisterMutation,useSendOtpForHotelMutation,useVerifyOtpForHotelMutation } from "../../slices/hotelApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setHotelCredentials } from "../../slices/hotelAuthSlice";
import InputValidationForAuth from "../../components/InputValidationForAuth/InputValidationForAuth";
import { registerFormValidation } from "../../utils/registerFormValidation";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';


function RegisterHotelier() {
  const [register] = useHotelRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotelInfo } = useSelector((state) => state.hotelAuth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [otp,setOtp] = useState('')

  const [showModal,setShowModal] = useState(false) 

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confPassword:'',
    mobile:'',
  });
  const [sendOtpForHotel] = useSendOtpForHotelMutation()
  const [verifyOtpForHotel] = useVerifyOtpForHotelMutation()

  const handleClose = ()=>{
    setShowModal(false)
  }

  const sendOtp = async(e)=> {
    console.log('sendOtp');
    e.preventDefault();
    const validationErrors = registerFormValidation(name, email, password,confPassword,mobile);

    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    try {
      const responseFromSendOtp = await sendOtpForHotel({ mobile }).unwrap();
      setShowModal(true)
    }
    catch (error) {
     toast.error("Error Sending Otp") 
    }
  }

  const verifyOtp= async(e) => {
    e.preventDefault();
    try {
    console.log('ggggg');
    const responseFromVerifyOtp = await verifyOtpForHotel({mobile,otp}).unwrap()
    submitHandler()
    handleClose()
    }
    catch (err) {
      toast.error(err?.data?.message || err?.error);

    }

  }


  const submitHandler= async(e) => {
   
    try {
      const responseFromApiCall = await register({
        name,
        email,
        mobile,
        password,
      }).unwrap();
      dispatch(setHotelCredentials({ ...responseFromApiCall }));
      navigate("/Hotel/Dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  useEffect(() => {
    if (hotelInfo) {
      navigate("/Hotel/Details");
    }
  }, [navigate, hotelInfo]);
  return (
    <>
      <ToastContainer />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                {/* Start  SignUP */}
                <form className="row y-gap-20" onSubmit={sendOtp}>
                  <div className="col-12">
                    <h1 className="text-22 fw-500">Hotel Registration</h1>
                    <p className="mt-10"></p>
                  </div>
                  <InputValidationForAuth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    error={errors.name} 
                    placeholder="Your Name"
                  />

                  <InputValidationForAuth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Your Email"
                    error={errors.email} 
                  />

                  <InputValidationForAuth
                    label="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="number"
                    placeholder="Your Mobile No"
                    error={errors.mobile} // Pass the validation error
                  />

                  <InputValidationForAuth
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your Password"
                    error={errors.password} // Pass the validation error
                  />


                    <InputValidationForAuth
                    label="Confirm Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    type="password"
                    placeholder="Your Confirm Password"
                    error={errors.confPassword}
                  />

                  <div className="col-12">
                    <div className="d-flex "></div>
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

                  <p className="mt-3 text-center">
                  Already have an account? <Link to="/Hotel/Login">Login</Link>
                   </p>
                  {/* End .col */}
                </form>
                <br />
                <br />

                {/* End SignUP */}

                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="text-dark">
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <Form onSubmit={verifyOtp}>
            <Form.Group controlId="formName">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="number"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterHotelier;
