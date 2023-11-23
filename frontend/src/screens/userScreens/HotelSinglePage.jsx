import Header1 from "../../components/UserNavbar/Header1";
import { DateObject } from "react-multi-date-picker";
import dayjs from "dayjs";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetRoomDataForUserMutation,
  useGetSingleHotelDataForUserMutation,
} from "../../slices/userApiSlice";
import AvailableRooms from "../../components/AvailableRoom/AvailableRoom";
import SidebarDateFilter from "../../components/SidebarDateFilter/SidebarDateFilter";
import ReviewForUser from "../../components/ReviewForUser/ReviewForUser";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useGetHotelWiseReviewQuery } from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import ModalVideo from "react-modal-video";

const HOTEL_IMAGE_DIR_PATH = "https://www.voyagerhub.vinayakvenugopal.com/HotelImages/";
import HeaderBodySeperator from "../../components/HeaderBodySeperator/HeaderBodySeperator";

function HotelSinglePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [singleHotelData] = useGetSingleHotelDataForUserMutation();
  const [getRoomData] = useGetRoomDataForUserMutation();
  const [checkIn, setCheckIn] = useState(new DateObject().toDate());
  const [checkOut, setCheckOut] = useState(new DateObject().toDate());

  const [isOpen, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState([]);

  const [loading, setLoading] = useState(true); // Add a loading state
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await singleHotelData({ id: id });
        const data = responseFromApiCall.data;
        setHotel(data);
        setVideoLink(data.videoUrl);

        const response = await getRoomData({ id: id });
        const roomData = response.data;
        setRoom(roomData);
        setLoading(false);
      };

      fetchData();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const checkAvailability = async () => {
    const response = await getRoomData({
      id: id,
      checkIn: checkIn,
      checkOut: checkOut,
    });
    const roomData = response.data;
    setRoom(roomData);
    setLoading(false);
  };
  const {
    data: reviewData,
    isLoading,
    isError,
    refetch: reviewRefetch,
  } = useGetHotelWiseReviewQuery({ id: id });

  const [videoLink, setVideoLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  console.log(thumbnailUrl);

  useEffect(()=>{
    const extractVideoIdAndThumbnail = () => {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = videoLink.match(regex);
      if (match) {
        const extractedVideoId = match[1];
        setVideoId(extractedVideoId);
        const defaultThumbnailUrl = `https://img.youtube.com/vi/${extractedVideoId}/default.jpg`;
        setThumbnailUrl(defaultThumbnailUrl);
      } else {
        setVideoId('Invalid YouTube link');
        setThumbnailUrl('');
      }
    };
    extractVideoIdAndThumbnail()
  },[hotel])

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  const alreadyReviewed = reviewData.some((review) => {
    return review.userId === userInfo._id; 
  });



  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />

      <div className="header-margin"></div>
      <Header1 />
      <HeaderBodySeperator />
      <section className="pt-40" style={{ marginTop: "70px" }}>
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">{hotel?.name}</h1>
                </div>
                {/* End .col */}
                <div className="d-flex x-gap-5 items-center pt-10">
                  {Array.from({ length: hotel.starRating }).map((_, index) => (
                    <i
                      key={index}
                      className="icon-star text-10 text-yellow-2"
                    ></i>
                  ))}
                </div>
              </div>
              {/* End .row */}

              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <div className="d-flex items-center text-15 text-light-1">
                    <i className="icon-location-2 text-16 mr-5" />
                    {hotel?.address}
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    data-x-click="mapFilter"
                    className="text-blue-1 text-15 underline"
                  ></button>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">
                  <div className="text-14">
                     <span className="text-22 text-dark-1 fw-500"></span>
                  </div>
                </div>
                <div className="col-auto">
                  
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
                  original={HOTEL_IMAGE_DIR_PATH + hotel.images[0]}
                  thumbnail={HOTEL_IMAGE_DIR_PATH + hotel.images[0]}
                  width={660}
                  height={660}
                >
                  {({ ref, open }) => (
                    <img
                      src={HOTEL_IMAGE_DIR_PATH + hotel.images[0]}
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
                  original={HOTEL_IMAGE_DIR_PATH + hotel.images[1]}
                  thumbnail={HOTEL_IMAGE_DIR_PATH + hotel.images[1]}
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src={HOTEL_IMAGE_DIR_PATH + hotel.images[1]}
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
                  src={thumbnailUrl}
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
                  original={HOTEL_IMAGE_DIR_PATH + hotel.images[2]}
                  thumbnail={HOTEL_IMAGE_DIR_PATH + hotel.images[2]}
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src={HOTEL_IMAGE_DIR_PATH + hotel.images[2]}
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
                  src={HOTEL_IMAGE_DIR_PATH + hotel.images[3]}
                  alt="image"
                  className="rounded-4"
                />
                <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                  <Item
                    original={HOTEL_IMAGE_DIR_PATH + hotel.images[3]}
                    thumbnail={HOTEL_IMAGE_DIR_PATH + hotel.images[3]}
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

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="row y-gap-40">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Property highlights</h3>
                  {/* <PropertyHighlights /> */}
                </div>
                {/* End .col-12 Property highlights */}

                <div id="overview" className="col-12">
                  <h3 className="text-22 fw-500 pt-40 border-top-light">
                    Description
                  </h3>
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
                {/* End .col-12  Overview */}

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
                {/* End .col-12 Most Popular Facilities */}

                <div className="col-12">{/* <RatingTag /> */}</div>
                {/* End .col-12 This property is in high demand! */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-xl-4">
              <SidebarDateFilter
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                checkAvailability={checkAvailability}
                hotel={hotel}
              />
            </div>
            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>

      <section id="rooms" className="pt-30">
        <div className="container">
          <div className="row pb-20">
            <div className="col-auto">
              {room.length > 0 && (
                <h3 className="text-22 fw-500">
                  Availablile Rooms From{" "}
                  {dayjs(room[0].checkinDate).format("DD/MM/YYYY")} to{" "}
                  {dayjs(room[0].checkoutDate).format("DD/MM/YYYY")}
                </h3>
              )}
            </div>
          </div>
          {/* End .row */}
          <AvailableRooms room={room} hotel={hotel} />
        </div>
        {/* End .container */}
      </section>

      <section className="pt-40" id="reviews">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-22 fw-500">Guest reviews</h3>
            </div>
          </div>

          {/* <ReviewProgress /> */}

          <div className="pt-40">
            <ReviewForUser data={reviewData} />
          </div>

          <div className="row pt-30"></div>
        </div>
      </section>

      {alreadyReviewed || (
        <section className="pt-40">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10">
                <div className="row">
                  <div className="col-auto">
                    <h3 className="text-22 fw-500">Leave a Review</h3>
                    <p className="text-15 text-dark-1 mt-5">
                      Your email address will not be published.
                    </p>
                  </div>
                </div>
                <ReviewForm hotelId={id} refetch={reviewRefetch} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default HotelSinglePage;
