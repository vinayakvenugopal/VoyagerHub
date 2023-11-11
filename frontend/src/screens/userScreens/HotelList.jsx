import Header1 from "../../components/UserNavbar/Header1";
import HotelListForUsers from "../../components/HotelListForUsers/HotelListForUsers";
import { UserHotelListSearch } from "../../components/UserHotelListSearch/UserHotelListSearch";
import { HomeSearchBox } from "../../components/HomeSearchBox/HomeSearchBox";

function HotelList(){



  return (
    <>
    <div className="header-margin"></div>
    <Header1/>
    <section className="section-bg pt-40 pb-40 relative z-5" style={{marginTop:'75px'}}>
    <div className="section-bg__item col-12">
          <img
            src="/img/home/bg-1.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600 text-white">Find Your Dream Luxury Hotel</h1>
              </div>
              <UserHotelListSearch/>  
            </div>
          </div>
        </div>
      </section>
    <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                {/* <Sidebar /> */}
              </aside>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Hotels
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    {/* <Sidebar /> */}
                  </aside>
                </div>
              </div>
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              {/* <TopHeaderFilter /> */}
              <div className="mt-30"></div>
              <div className="row y-gap-30">
              <HotelListForUsers/>
              </div>
              {/* <Pagination /> */}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default HotelList
