import React, { useState,useEffect } from "react";
import {
  useRegisterMutation,
  useGoogleLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation
} from "../../slices/userApiSlice";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/userAuthSlice";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Header1 from "../../components/UserNavbar/Header1";
import "react-toastify/dist/ReactToastify.css";
import InputValidationForAuth from "../../components/InputValidationForAuth/InputValidationForAuth";
import { registerFormValidation } from "../../utils/registerFormValidation";
import { Link } from "react-router-dom";


function RegisterScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const [register] = useRegisterMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [sendOtpToUser] = useSendOtpMutation();
  const [verifyUserOtp] = useVerifyOtpMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
   const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [otp,setOtp] = useState('')

  const [showModal,setShowModal] = useState(false) 

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    mobile:""
  });
const handleShowModal = () =>{
  setShowModal(true)
}
  const handleClose = ()=>{
    setShowModal(false)

  }

  async function sendOtp(e) {
    e.preventDefault();
    const validationErrors = registerFormValidation(
      name,
      email,
      password,
      confPassword,
      mobile
    );

    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }
    try {
      const responseFromSendOtp = await sendOtpToUser({ mobile }).unwrap();
      console.log(responseFromSendOtp);
      setShowModal(true)
    }
    catch (error) {
     toast.error("Error Sending Otp") 
    }
  }

  async function verifyOtp(e){
    e.preventDefault();
    try {
    console.log('ggggg');
    const responseFromVerifyOtp = await verifyUserOtp({mobile,otp}).unwrap()
    console.log(responseFromVerifyOtp);
    submitHandler()
    handleClose()
    }
    catch (err) {
      toast.error(err?.data?.message || err?.error);

    }

  }

  

  async function submitHandler() {
  
    try {
      const responseFromApiCall = await register({
        name,
        email,
        password,
        mobile,
      }).unwrap();
      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }
  const handleSuccess = async (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    console.log(decoded);
    const googleName = decoded.name;
    const googleEmail = decoded.email;

    const responseFromApiCall = await googleLogin({
      googleName,
      googleEmail,
    }).unwrap();
    dispatch(setCredentials({ ...responseFromApiCall }));
    navigate("/");
  };


  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);


  return (
    <>
      <Header1 />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                {/* Start  SignUP */}
                <form className="row y-gap-20" onSubmit={sendOtp}>
                  <div className="col-12">
                    <h1 className="text-22 fw-500">Register Here.....</h1>
                    <p className="mt-10"></p>
                  </div>

                  <InputValidationForAuth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Your Name"
                    error={errors.name}
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
                    error={errors.mobile} 

                  />

                  <InputValidationForAuth
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your Password"
                    error={errors.password}
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
                  {/* End .col */}
                </form>
                <br />
                <br />

                {/* End SignUP */}

                <GoogleOAuthProvider clientId="579662997574-s08dt3piebftu4qfo8t0iccbu2ei21tq.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>


      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mobile phone verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="mobile-text">
            Enter the code we just sent to your mobile phone{' '}
            <b className="text-danger">{mobile}</b>
          </span>
          <Form onSubmit={verifyOtp}>
            <Form.Group controlId="formName">
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
          <div className="text-center mt-2">
            <span className="d-block mobile-text">
              Didn't receive the code?
            </span>
            <Button
              variant="link"
              className="text-danger font-weight-bold cursor"
              onClick={handleClose}
            >
              Resend
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default RegisterScreen;
