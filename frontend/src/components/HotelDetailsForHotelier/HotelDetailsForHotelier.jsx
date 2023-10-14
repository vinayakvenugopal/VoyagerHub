import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSingleHotelDataMutation } from "../../slices/hotelApiSlice";
const HOTEL_IMAGE_DIR_PATH = "http://localhost:5000/HotelImages/";

function HotelDetailsForHotelier() {
  const [hotel, setHotel] = useState();
  console.log(hotel);

  const [loading, setLoading] = useState(true);
  const { hotelInfo } = useSelector((state) => state.hotelAuth);
  const id = hotelInfo._id;
  const [singleHotelData] = useGetSingleHotelDataMutation();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await singleHotelData({ hotelierId: id });
        const data = responseFromApiCall.data;
        setHotel(data);
        setLoading(false);
      };

      fetchData();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);
  if(loading){
    return(
        <h1>loading</h1>
    )
  }
  return (
    <>
      <Gallery>
        <div className="galleryGrid -type-2">
          <div className="galleryGrid__item relative d-flex justify-end">
            <Item
              original={HOTEL_IMAGE_DIR_PATH + hotel?.images[0]}
              thumbnail={HOTEL_IMAGE_DIR_PATH + hotel?.images[0]}
              width={660}
              height={660}
            >
              {({ ref, open }) => (
                <img
                  src={HOTEL_IMAGE_DIR_PATH + hotel?.images[0]}
                  ref={ref}
                  onClick={open}
                  alt="image"
                  role="button"
                  className="rounded-4"
                />
              )}
            </Item>
            <div className="absolute px-20 py-20">
              <button className="button -blue-1 size-40 rounded-full bg-white">
                <i className="icon-heart text-16" />
              </button>
            </div>
          </div>
          {/* End .galleryGrid__item */}

          <div className="galleryGrid__item">
            <Item
              original={HOTEL_IMAGE_DIR_PATH + hotel?.images[1]}
              thumbnail={HOTEL_IMAGE_DIR_PATH + hotel?.images[1]}
              width={450}
              height={375}
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={HOTEL_IMAGE_DIR_PATH + hotel?.images[1]}
                  alt="image"
                  className="rounded-4"
                  role="button"
                />
              )}
            </Item>
          </div>
          {/* End .galleryGrid__item */}

          <div className="galleryGrid__item">
            <Item
              original={HOTEL_IMAGE_DIR_PATH + hotel?.images[2]}
              thumbnail={HOTEL_IMAGE_DIR_PATH + hotel?.images[2]}
              width={450}
              height={375}
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={HOTEL_IMAGE_DIR_PATH + hotel?.images[2]}
                  alt="image"
                  className="rounded-4"
                  role="button"
                />
              )}
            </Item>
          </div>
          {/* End .galleryGrid__item */}

          <div className="galleryGrid__item relative d-flex justify-end items-end">
            <img
              src={HOTEL_IMAGE_DIR_PATH + hotel?.images[3]}
              alt="image"
              className="rounded-4"
            />
            <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
              <Item
                original={HOTEL_IMAGE_DIR_PATH + hotel?.images[3]}
                thumbnail={HOTEL_IMAGE_DIR_PATH + hotel?.images[3]}
                width={362}
                height={302}
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
      <div className="col-auto" style={{ marginTop: "20px" }}>
        <h1 className="text-30 sm:text-25 fw-600">{hotel?.name}</h1>
      </div>
      <div className="d-flex items-center text-15 text-light-1">
        <i className="icon-location-2 text-16 mr-5" />
        {hotel?.address}
      </div>
      <div id="overview" className="col-12">
        <h3 className="text-22 fw-500 pt-40 border-top-light">Description</h3>
        {hotel.desc}
      </div>

      <div className="col-12">
                  <h3 className="text-22 fw-500 pt-40 border-top-light">
                    Most Popular Facilities
                  </h3>
                  <div className="row y-gap-10 pt-20">
                    {/* <PopularFacilities /> */}
                    <div className="row x-gap-10 y-gap-10 pt-20">
                      {hotel.aminities.map((amenity, index) => (
                        <div className="col-auto">
                          <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                            {amenity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

      
    </>
  );
}

export default HotelDetailsForHotelier;
