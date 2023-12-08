import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/userAuthSlice";
import Notification from "../Notification/Notification";
import { IoIosNotifications } from "react-icons/io";

const Header1 = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [showNotification,setShowNotification] = useState(false)
  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout({}));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
    {showNotification && <Notification setShowNotification={setShowNotification}  />}
      <header className={`header bg-dark-3 ${navbar ? "is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <img
                  src="/logo.png"
                  alt="logo icon"
                  width={"75px"}
                  height={"75px"}
                />

                {/* End logo */}

                <div className="header-menu">
                  <div className="header-menu__content">
                    {/* <MainMenu style="text-white" /> */}
                    <nav className="menu js-navList">
                      <ul className={`menu__nav text-white -is-active`}>
                        <Link to="/#">
                          <span
                            className="mr-10 "
                            style={{ marginLeft: "500px" }}
                          >
                            Home
                          </span>
                        </Link>
                      
                        <Link to="/booking-list">
                          <span className="mr-10">Bookings</span>
                        </Link>
                      </ul>
                    </nav>
                  </div>
                </div>
                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider*/}
                </div>
                {/* End language and currency selector */}

                {/* Start btn-group */}
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  {userInfo ? (
                    <>
                      <nav className="menu js-navList">
                        <ul className="menu__nav text-white -is-active">
                          <li className={`menu-item-has-children`}></li>
                          {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" 
                          alt="Admin" className="rounded-circle" width="35" /> */}
                           <Link to="/profile"><span className="mr-10">{userInfo.name}</span></Link>
                        </ul>
                      </nav>
                      



                      <button
                        onClick={logoutHandler}
                        className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                      >
                        Logout
                      </button>
                      <div className="menu js-navList">
                      <IoIosNotifications style={{color:"white", marginLeft:'15px', fontSize:'25px'}} onClick={()=>setShowNotification(true)} cursor={'pointer'}/>
                      </div>
                    </>
                  ) : (
                    <Link
                      to="/Register"
                      className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                    >
                      Sign In / Register
                    </Link>
                  )}
                </div>
                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                  <div>
                    <Link
                      to="/others-pages/login"
                      className="d-flex items-center icon-user text-inherit text-22"
                    ></Link>
                  </div>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex={-1}
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      {/* <MobileMenu /> */}
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
