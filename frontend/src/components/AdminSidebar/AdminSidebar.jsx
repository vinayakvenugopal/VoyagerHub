import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAdminLogoutMutation } from '../../slices/adminApiSlice';
import { logoutAdmin } from '../../slices/adminAuthSlice';
import { useNavigate } from 'react-router-dom';



const HotelSidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null); // State to track active submenu
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hotelLogout] = useAdminLogoutMutation()

  const logoutHandler = async() =>{
    console.log('logout');
    try {
      await hotelLogout({}).unwrap();
      dispatch(logoutAdmin());
      navigate('/Admin/Login')
    } catch (error) {
      console.log(error);
      
    }
  }
  const sidebarData = [
    {
      icon: "/img/dashboard/sidebar/compass.svg",
      title: "Dashboard",
      links: [
        { title: "View", href: "/Admin/Dashboard" },
      ],
    },
    {
      icon: "/img/dashboard/sidebar/booking.svg",
      title: "Manage Hotels",
      links: [
        { title: "Hotels", href: "/Admin/Hotels" },
      ],
    },
    {
      icon: "/img/dashboard/sidebar/booking.svg",
      title: "Facilities",
      links: [
        { title: "Facilities", href: "/Admin/Facilities" },
     
      ],
    },
    {
      icon: "/img/dashboard/sidebar/booking.svg",
      title: "Complaints",
      links: [
        { title: "Complaints", href: "/Admin/Complaints" },
     
      ],
    },
    {
      icon: "/img/dashboard/sidebar/booking.svg",
      title: "Review Management",
      links: [
        { title: "Reviews", href: "/Admin/Reviews" },
     
      ],
    }
  ];

  // Function to toggle the active submenu
  const toggleSubMenu = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  return (
    <>
      <div className="sidebar -dashboard" id="vendorSidebarMenu">
             {sidebarData.map((item, index) => (
          <div className="sidebar__item" key={index}>
            <div className="accordion -db-sidebar js-accordion">
              <div className="accordion__item">
                <div
                  className="accordion__button"
                  onClick={() => toggleSubMenu(index)} // Toggle submenu when clicked
                >
                  <div className="sidebar__button col-12 d-flex items-center justify-between">
                    <div className="d-flex items-center text-15 lh-1 fw-500">
                      <img
                        width={20}
                        height={20}
                        src={item.icon}
                        alt="image"
                        className="mr-10"
                      />
                      {item.title}
                    </div>
                    <div className={`icon-chevron-sm-down text-7 ${activeMenu === index ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <div
                  className={`collapse ${activeMenu === index ? 'show' : ''}`} // Conditionally add 'show' class
                  data-bs-parent="#vendorSidebarMenu"
                >
                  <ul className="list-disc pt-15 pb-5 pl-40">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link to={link.href} className="text-15">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="sidebar__item ">
          <button
            onClick={logoutHandler}
            className="sidebar__button d-flex items-center text-15 lh-1 fw-500"
          >
            <img
              width={20}
              height={20}
              src="/img/dashboard/sidebar/log-out.svg"
              alt="image"
              className="mr-15"
            />
            Logout
          </button>
        </div>
        {/* End accordion__item */}
      </div>
    </>
  );
};

export default HotelSidebar;
