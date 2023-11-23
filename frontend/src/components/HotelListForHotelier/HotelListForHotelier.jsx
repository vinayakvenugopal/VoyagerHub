import React,{useEffect, useState} from 'react'
const HOTEL_IMAGE_DIR_PATH = 'https://www.voyagerhub.vinayakvenugopal.com/HotelImages/'
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom';
export const HotelListForHotelier = ({hotelsData}) => {

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

              {/* End .row */}
            </div>
            {/* End col */}

            <div className="col-md-auto text-right md:text-left">
              <div className="d-flex flex-column justify-between h-full">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
              
                  </div>
             
                </div>
                <Link to={`/hotel/Details/${item._id}`}>
                <div className="pt-24">
                  <div className="fw-500">View More......</div>
            </div>
            </Link>
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