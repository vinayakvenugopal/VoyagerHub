import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/userAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import Header1 from "../../components/UserNavbar/Header1";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function LoginScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const [register] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const responseFromApiCall = await register({ email, password }).unwrap();
      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }
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
                <form className="row y-gap-20" onSubmit={submitHandler}>
                  <div className="col-12">
                    <h1 className="text-22 fw-500">Welcome back</h1>
                    <p className="mt-10">Already have an account yet? </p>
                  </div>

                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="lh-1 text-14 text-light-1">Email</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="lh-1 text-14 text-light-1">
                        Password
                      </label>
                    </div>
                  </div>
            
                  <div className="col-12">
                    <div className="d-flex "></div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="button py-20 -dark-1 bg-blue-1 text-white w-100"
                    >
                      Login <div className="icon-arrow-top-right ml-15" />
                    </button>
                  </div>
                  <p className="mt-3 text-center">
                    New to Here? <Link to="/Register">Register</Link>
                  </p>
                </form>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginScreen;
