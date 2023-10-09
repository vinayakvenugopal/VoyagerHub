import Header1 from "../../components/UserNavbar/Header1"
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetSingleHotelDataMutation } from "../../slices/hotelApiSlice";
const HOTEL_IMAGE_DIR_PATH = 'http://localhost:5000/HotelImages/'
import HeaderBodySeperator from "../../components/HeaderBodySeperator/HeaderBodySeperator";

function HotelSinglePage() {
  const [singleHotelData]:any = useGetSingleHotelDataMutation()

    const [isOpen, setOpen] = useState(false);
    const [hotel,setHotel] = useState<any>({})
    const [loading, setLoading] = useState(true); // Add a loading state

     console.log(hotel.images);
    const location = useLocation(); 
     const id = location.pathname.split("/")[2];
    useEffect(() => {
    
        try {
         

          const fetchData = async () => {
            const responseFromApiCall = await singleHotelData({id});
            const data = responseFromApiCall.data;
            setHotel(data);
            setLoading(false)
          };
      
          fetchData();
        } catch (error:any) {
          console.error("Error fetching users:", error);
    
        }
    
      }, []);
 if (loading) {
    // Render a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }
  return (
   <>
      <div className="header-margin"></div>

   <Header1/>
   <HeaderBodySeperator/>
  <section className="pt-40" style={{marginTop:"70px"}}>
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="row x-gap-20  items-center">
              <div className="col-auto">
                <h1 className="text-30 sm:text-25 fw-600">{hotel?.name}</h1>
              </div>
              {/* End .col */}
              <div className="col-auto">
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
              </div>
            </div>
            {/* End .row */}

            <div className="row x-gap-20 y-gap-20 items-center">
              <div className="col-auto">
                <div className="d-flex items-center text-15 text-light-1">
                  <i className="icon-location-2 text-16 mr-5" />
                  {hotel?.location}
                </div>
              </div>
              <div className="col-auto">
                <button
                  data-x-click="mapFilter"
                  className="text-blue-1 text-15 underline"
                >
                  Show on map
                </button>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End .col */}

          <div className="col-auto">
            <div className="row x-gap-15 y-gap-15 items-center">
              <div className="col-auto">
                <div className="text-14">
                  From{" "}
                  <span className="text-22 text-dark-1 fw-500">
                    US${hotel?.price}
                  </span>
                </div>
              </div>
              <div className="col-auto">
                <Link
                  to="/hotel/booking-page"
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                >
                  Select Room <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}

        <Gallery>
          <div className="galleryGrid -type-1 pt-30">
            <div className="galleryGrid__item relative d-flex">
              <Item
                original={HOTEL_IMAGE_DIR_PATH+hotel.images[0]}
                thumbnail={HOTEL_IMAGE_DIR_PATH+hotel.images[0]}
                width={660}
                height={660}
              >
                {({ ref, open }) => (
                  <img
                    src={HOTEL_IMAGE_DIR_PATH+hotel.images[0]}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="rounded-4"
                  />
                )}
              </Item>
              <div className="absolute px-20 py-20 col-12 d-flex justify-end">
                <button className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1">
                  <i className="icon-heart text-16" />
                </button>
              </div>
            </div>
            {/* End .galleryGrid__item */}

            <div className="galleryGrid__item">
              <Item
                original={HOTEL_IMAGE_DIR_PATH+hotel.images[1]}
                thumbnail={HOTEL_IMAGE_DIR_PATH+hotel.images[1]}
                width={450}
                height={375}
              >
                {({ ref, open }) => (
                  <img
                  
                    ref={ref}
                    onClick={open}
                    src={HOTEL_IMAGE_DIR_PATH+hotel.images[1]}
                    alt="image"
                    className="rounded-4"
                    role="button"
                  />
                )}
              </Item>
            </div>
            {/* End .galleryGrid__item */}

            <div className="galleryGrid__item relative d-flex">
              <img
                src="/img/gallery/1/3.png"
                alt="image"
                className="rounded-4"
                role="button"
              />
              <div className="absolute h-full col-12 flex-center">
                <div
                  className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1 js-gallery"
                  role="button"
                  onClick={() => setOpen(true)}
                >
                  <i className="icon-play text-16" />
                </div>
              </div>
            </div>
            {/* End .galleryGrid__item */}

            <div className="galleryGrid__item">
              <Item
                original={HOTEL_IMAGE_DIR_PATH+hotel.images[2]}
                thumbnail={HOTEL_IMAGE_DIR_PATH+hotel.images[2]}
                width={450}
                height={375}
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={HOTEL_IMAGE_DIR_PATH+hotel.images[2]}
                    alt="image"
                    className="rounded-4"
                    role="button"
                  />
                )}
              </Item>
            </div>
            {/* End .galleryGrid__item */}

            <div className="galleryGrid__item relative d-flex">
              <img
                    src={HOTEL_IMAGE_DIR_PATH+hotel.images[3]}
                    alt="image"
                className="rounded-4"
              />
              <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                <Item
                    original={HOTEL_IMAGE_DIR_PATH+hotel.images[3]}
                    thumbnail={HOTEL_IMAGE_DIR_PATH+hotel.images[3]}
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <div
                      className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                      ref={ref}
                      onClick={open}
                      role="button"
                    >
                      See All Photos
                    </div>
                  )}
                </Item>
              </div>
            </div>
            {/* End .galleryGrid__item */}
          </div>
        </Gallery>
      </div>
      {/* End .container */}
    </section>
   </>
  )
}

export default HotelSinglePage
