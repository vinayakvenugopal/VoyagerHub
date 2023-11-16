import Header1 from "../../components/UserNavbar/Header1";
import HotelListForUsers from "../../components/HotelListForUsers/HotelListForUsers";
import { UserHotelListSearch } from "../../components/UserHotelListSearch/UserHotelListSearch";
import { HotelListSidebar } from "../../components/HotelListSidebar/HotelListSidebar";
import { useState, useEffect } from "react";
import { useGetHotelsForUserMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsX";

function HotelList() {
  const [hotelsData, setHotelsData] = useState([]);
  const [filteredhotelsData, setFilteredhotelsData] = useState([]);
  const [hotelDataFromApi] = useGetHotelsForUserMutation();
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get("name");
  const checkinDate = urlParams.get("checkinDate");
  const checkoutDate = urlParams.get("checkoutDate");

  const [activeRating, setActiveRating] = useState(null);
  const [checkedAmenities, setCheckedAmenities] = useState([]);
  const [price, setPrice] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState('asc')

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await hotelDataFromApi({
          name: name,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
        });

        setHotelsData(responseFromApiCall.data);
      };

      fetchData();
    } catch (error) {
      toast.error(error);
      console.error("Error fetching users:", error);
    }
  }, [queryString]);

  useEffect(() => {
    let filteredData = [...hotelsData];
    if (activeRating) {
      filteredData = filteredData.filter(
        (hotel) => hotel.starRating === activeRating
      );
    }

    if (checkedAmenities.length > 0) {
      filteredData = filteredData.filter((hotel) =>
        hotel.aminities.some((amenity) => checkedAmenities.includes(amenity))
      );
    }
    if (price[0] > 0 || price[1] < 5000) {
      filteredData = filteredData.filter((hotel) => {
        return hotel.minPrice >= price[0] && hotel.minPrice <= price[1];
      });
    }
    if (sortOrder === 'asc') {
        filteredData.sort((a, b) => a.minPrice - b.minPrice);
      } else if(sortOrder === 'desc') {
        filteredData.sort((a, b) => b.minPrice - a.minPrice);
      }
    setFilteredhotelsData(filteredData);
  }, [
    activeRating,
    checkedAmenities,
    price[0],
    price[1],
    queryString,
    hotelsData,
    sortOrder
  ]);

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <div className="header-margin"></div>
      <Header1 />
      <section
        className="section-bg pt-40 pb-40 relative z-5"
        style={{ marginTop: "75px" }}
      >
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
                <h1 className="text-30 fw-600 text-white">
                  Find Your Dream Luxury Hotel
                </h1>
              </div>
              <UserHotelListSearch />
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <HotelListSidebar
                  activeRating={activeRating}
                  setActiveRating={setActiveRating}
                  checkedAmenities={checkedAmenities}
                  setCheckedAmenities={setCheckedAmenities}
                  price={price}
                  setPrice={setPrice}
                />
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
                  <aside className="sidebar y-gap-40  xl:d-block"></aside>
                </div>
              </div>
            </div>
            <div className="col-xl-9 ">
              <div className="row y-gap-10 items-center justify-between">
                <div className="col-auto">
                  <div className="text-18">
                    <span className="fw-500 ">{filteredhotelsData.length} hotels</span> found....
                  </div>
                </div>

                <div className="col-auto">
                  <div className="row x-gap-20 y-gap-20">
                    <div className="col-auto">
                      {sortOrder==='asc'||sortOrder===''?
                      <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
                      onClick={()=>setSortOrder('desc')}
                      >
                        <i className="icon-up-down text-14 mr-10" />
                        Price Low to High
                      </button>:
                      <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
                       onClick={()=>setSortOrder('asc')}
                      >
                        <i className="icon-up-down text-14 mr-10" />
                        Price Low to high
                      </button>
                      }
                    </div>

                    <div className="col-auto d-none xl:d-block">
                      <button
                        data-bs-toggle="offcanvas"
                        data-bs-target="#listingSidebar"
                        className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
                      >
                        <i className="icon-up-down text-14 mr-10" />
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                <HotelListForUsers hotelsData={filteredhotelsData} startIndex={startIndex} endIndex={endIndex} />
              </div>
              <Pagination
              currentPage={currentPage}
              handlePageClick={handlePageClick}
              totalPages={Math.ceil(filteredhotelsData.length / itemsPerPage)}
              setCurrentPage={setCurrentPage}
               />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HotelList;
