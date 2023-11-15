import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
const HOTEL_IMAGE_DIR_PATH = "http://localhost:5000/HotelImages/";
import { Link } from "react-router-dom";

function HotelDetailsForHotelier({ hotel }) {
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
        <span
          title={hotel.name}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <h1 className="text-30 sm:text-25 fw-600">{hotel?.name}</h1>
        </span>
        
      </div>
      <div className="d-flex items-center text-15 text-light-1">
        <i className="icon-location-2 text-16 mr-5" />
        {hotel?.address}
        <br />
        
      </div>
      <br />
      <Link to={`/Hotel/updateDetails/${hotel._id}`}><div style={{width:"100%"}} className="d-flex justify-content">
                    <div className="btn btn-warning">Edit Details</div>
                   </div></Link>
                   <br />
      <div id="overview" className="col-12">
        <h3 className="text-22 fw-500 pt-40 border-top-light">Description</h3>
        <span
          title={hotel.desc}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {hotel.desc}
        </span>
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
