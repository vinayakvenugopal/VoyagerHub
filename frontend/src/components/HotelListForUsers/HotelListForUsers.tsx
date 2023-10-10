import { useState,useEffect } from "react";
import { useGetHotelDataMutation } from "../../slices/hotelApiSlice";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import ImageSlider from "../ImageSlider/ImageSlider";
import { useNavigate } from "react-router-dom";


interface Hotel {
  name: string;
  city: string;
  address: string;
  images: string[];
  desc: string;
  aminities: string[]; 
 
}

function HotelListForUsers() {
    const [hotelsData,setHotelsData] = useState<Hotel[]>([])
    const [userDataFromApi]:any = useGetHotelDataMutation()
    const navigate = useNavigate()
    useEffect(() => {
    
        try {
    
          const fetchData = async () => {
            const responseFromApiCall = await userDataFromApi({});
            const usersArray = responseFromApiCall.data;
            setHotelsData(usersArray);
          };
      
          fetchData();
        } catch (error:any) {
          toast.error(error);
          console.error("Error fetching users:", error);
    
        }
    
      }, []);


  return (
    <>
      {hotelsData.slice(0, 7).map((item:any) => (
        <div className="col-12" key={item?.id} >
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    {/* <div className="cardImage-slider rounded-4  custom_inside-slider">
                            <img
                              width={250}
                              height={250}
                              className="rounded-4 col-12 js-lazy"
                              alt="image"
                              src={HOTEL_IMAGE_DIR_PATH+item.images[0]}
                            />
                    </div> */}
                     <div className="cardImage-slider rounded-4 custom_inside-slider">
            <ImageSlider images={item.images} />
          </div>
                  </div>
                  {/* End image */}

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-14 lh-16 fw-500">
                  {item?.name}
                  <br className="lg:d-none" /> {item?.address}
                  <div className="d-inline-block ml-10">
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                  </div>
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{item?.location}</p>
                  </div>

                  <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Show on map
                    </button>
                  </div>

                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>

                  <div className="col-auto">
                    <p className="text-14">2 km to city center</p>
                  </div>
                </div>

                <div className="text-14 lh-15 mt-20">
                  <div className="fw-500">King Room</div>
                  <div className="text-light-1">
              <span
                title={item.desc} // Add a tooltip to display the full description on hover
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Number of lines before applying ellipsis
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.desc}
              </span>
            </div>
                </div>

                {/* <div className="text-14 text-green-2 lh-15 mt-10">
                  <div className="fw-500">Free cancellation</div>
                  <div className="">
                    You can cancel later, so lock in this great price today.
                  </div>
                </div> */}

             
                  <div className="row x-gap-10 y-gap-10 pt-20">
                  {item.aminities.map((amenity, index) => (

                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                    {amenity}
                    </div>
                  </div>
                    ))}


                </div>
              
               
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      3,014 reviews
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item?.ratings}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                    8 nights, 2 adult
                  </div>
                  <div className="text-22 lh-12 fw-600 mt-5">
                    US${item?.price}
                  </div>
                  <div className="text-14 text-light-1 mt-5">
                    +US$828 taxes and charges
                  </div>

                  <Link
                    to={`/hotel-single/${item._id}`}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    See Availability{" "}
                    <div className="icon-arrow-top-right ml-15"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelListForUsers;

