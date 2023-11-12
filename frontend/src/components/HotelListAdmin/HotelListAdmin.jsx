import React,{useEffect, useState} from 'react'
const HOTEL_IMAGE_DIR_PATH = 'http://localhost:5000/HotelImages/'
import { FaBan,FaLockOpen } from "react-icons/fa6";
import { useBlockHotelMutation,useUnBlockHotelMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'


export const HotelListAdmin = ({hotelsData,refetch,setRefetch}) => {
const [blockHotelMutation] = useBlockHotelMutation()
const [unBlockHotelMutation] = useUnBlockHotelMutation()

  const blockHotel = async(id)=>{
    try {
      const response = await blockHotelMutation({id}).unwrap()
      setRefetch(!refetch)
      toast.success('Hotel Unlisted')
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  const unBlockHotel = async(id)=>{
    try {
      const response = await unBlockHotelMutation({id}).unwrap()
      setRefetch(!refetch)
      toast.success('Hotel Relisted')
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }


  return (
    <>
    <Tooltip id="my-tooltip" />

         {hotelsData.map((item,index) => (
        <div className="col-12" key={item._id}>
          <div className="row x-gap-20 y-gap-30">
            <div className="col-md-auto">
              <div className="cardImage ratio ratio-1:1 w-200 md:w-1/1 rounded-4">
                <div className="cardImage__content">
                  <img
                    width={200}
                    height={200}
                    className="rounded-4 col-12 js-lazy"
                    src={HOTEL_IMAGE_DIR_PATH+item.images[0]}
                    alt="image"
                  />
                </div>
                <div className="cardImage__wishlist">
                  <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                    <i className="icon-heart text-12" />
                  </button>
                </div>
              </div>
            </div>
            {/* End col */}

            <div className="col-md">
              <h3 className="text-18 lh-14 fw-500">{item?.name}</h3>
              <div className="d-flex x-gap-5 items-center pt-10">
              {Array.from({ length: item.starRating }).map((_, index) => (
                      <i
                        key={index}
                        className="icon-star text-10 text-yellow-2"
                      ></i>
                    ))}
              </div>

              <div className="row x-gap-10 y-gap-10 items-center pt-20">
                <div className="col-auto">
                  <p className="text-14">
                  {item?.address}
                    <button
                      data-x-click="mapFilter"
                      className="text-blue-1 underline ml-10"
                    >
                      Show on map
                    </button>
                  </p>
                </div>
                <div className="col-auto">
                  <div className="size-3 rounded-full bg-light-1" />
                </div>
                <div className="col-auto">
                  <p className="text-14">2 km to city center</p>
                </div>
              </div>
              {/* End .row */}

              <div className="row x-gap-10 y-gap-10 pt-20">
                  {item.aminities.map((amenity) => (
                    <div className="col-auto">
                      <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                        {amenity}
                      </div>
                    </div>
                  ))}
                </div>
              {/* End .row */}
            </div>
            {/* End col */}

            <div className="col-md-auto text-right md:text-left">
              <div className="d-flex flex-column justify-between h-full">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
              
                  </div>
                  { item.isListed? 
                  <div className="col-auto" onClick={()=>blockHotel(item._id)} data-tooltip-id="my-tooltip" data-tooltip-content="UnList Hotel" style={{cursor:'pointer'}}>
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                   <FaBan />

                    </div>
                  </div>  :
                  <div className="col-auto"  onClick={()=>unBlockHotel(item._id)}  data-tooltip-id="my-tooltip" data-tooltip-content="ReList Hotel" style={{cursor:'pointer'}}>
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                   <FaLockOpen/>
                  
                    </div>
                  </div> 
                  
                  }
                </div>
                <div className="pt-24">
                  <div className="fw-500">Starting from</div>
                  <span className="fw-500 text-blue-1">US$72</span> / night
                </div>
              </div>
            </div>
            {/* End col */}
          </div>
          {/* End .row */}
        </div>
      ))}

    </>
  )
}
