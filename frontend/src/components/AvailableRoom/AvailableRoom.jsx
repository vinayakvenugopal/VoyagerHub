


const ROOM_IMAGE_DIR_PATH = 'http://localhost:5000/RoomImages/'


const AvailableRooms= ({room}) => {

  return (
    <>
{room.map((item) => (
      <div className="border-light rounded-4 px-30 py-30 sm:px-20 sm:py-20 mt-20" key={item?.type}>
        <div className="row y-gap-20">
          <div className="col-12">
            <h3 className="text-18 fw-500 mb-15">{item?.type}</h3>
            <div className="roomGrid">
              <div className="roomGrid__header">
                <div>Room Type</div>
                <div>Benefits</div>
                <div>Sleeps</div>
                <div>Price for 1 nights</div>
                <div>Select Rooms</div>
                <div />
              </div>
              {/* End .roomGrid__header */}

              <div className="roomGrid__grid">
                <div>
                  <div className="ratio ratio-1:1">
                    <img
                      width={180}
                      height={180}
                      src={ROOM_IMAGE_DIR_PATH+item.images[0]}
                      alt="image"
                      className="img-ratio rounded-4"
                    />
                  </div>
                  {/* End image */}
                 
                  {/* End room features */}
             
                </div>
                {/* End roomgrid inner */}

                <div className="y-gap-30">
                  <div className="roomGrid__content">
                    <div>
                      <div className="y-gap-8">
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">{item.desc}</div>
                        </div>
                        {/* <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Pay nothing until March 30, 2022
                          </div>
                        </div>
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Free cancellation before April 1, 2022
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div>
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {Array.from({ length: item.occupancy }, (_, index) => (
      <div
        key={index}
     // Adjust the margin-right as needed
        className="icon-man text-24"
      />
    ))}
  </div>
</div>


                    <div>
                      <div className="text-18 lh-15 fw-500">
                      ₹ {item.price}
                      </div>
                      <div className="text-14 lh-18 text-light-1">
                        Includes taxes and charges
                      </div>
                    </div>

                    <div>
                      <div className="dropdown js-dropdown js-price-1-active">
                        <select className="form-select dropdown__button d-flex items-center rounded-4 border-light px-15 h-50 text-14">
                          <option value="1" >
                            1 ₹ {item.price}
                          </option>
                          <option value="2">2  ₹ {item.price}</option>
                          <option value="3"> 3  ₹ {item.price}</option>
                          <option value="4"> 4  ₹ {item.price}</option>
                          <option value="5"> 5  ₹ {item.price}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* End romm Grid horizontal content */}

                
                  {/* End romm Grid horizontal content */}

               
                  {/* End romm Grid horizontal content */}
                </div>
                {/* End price features */}

                <div>
                  <div className="text-14 lh-1">3 rooms for</div>
                  <div className="text-22 fw-500 lh-17 mt-5">
                  ₹{item.price}
                  </div>
                  <a
                    href="#"
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10"
                  >
                    Reserve <div className="icon-arrow-top-right ml-15" />
                  </a>
                 
                </div>
                {/* End right price info */}
              </div>
            </div>
            {/* End .roomGrid */}
          </div>
          {/* End .col-12 */}
        </div>
        {/* End .row */}
      </div>
      ))}

      {/* End standard twin room */}
    </>
  );
};

export default AvailableRooms;
