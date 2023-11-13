import {useState} from 'react'
const ROOM_IMAGE_DIR_PATH = 'http://localhost:5000/RoomImages/'
import { useDelteRoomMutation } from '../../slices/hotelApiSlice'
import Pagination from '../Pagination/Pagination'


function RoomListHotel({room,refetchData}) {
  const [deleteRoom] = useDelteRoomMutation()

  const handleDeleteRoom = async (id)=>{
    const response = await deleteRoom({id:id})
    refetchData()
  }

  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  

  return (
    <>
    <div>
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-4 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Area</th>
                    <th>Occuppancy</th>
                    <th>Image</th>
                    <th>Availability</th>
                    <th>Actions</th>

                  </tr>
                </thead>
                <tbody>
               
            

            {room.slice(startIndex,endIndex).map((item)=>
        
                  <tr key={item._id}>
                    <td className="text-blue-1 fw-500">{item.type}</td>
                    <td>₹ {item.price}</td>
                    <td>{item.area} sqft</td>

                    <td>
                      {item.occupancy}
                    </td>

                    <td>
                      <div className="text-blue-1 fw-500">
                        <img src={ROOM_IMAGE_DIR_PATH+item.images[0]}
                         alt="" />
                      </div>
                    </td>

                    <td>10</td>

                    <td>
                      <div className="row x-gap-10 y-gap-10 items-center">
                        {/* <div className="col-auto">
                          <button className="flex-center bg-light-2 rounded-4 size-35">
                            <i className="icon-eye text-16 text-light-1" />
                          </button>
                        </div> */}
                        <div className="col-auto">
                          <button className="flex-center bg-light-2 rounded-4 size-35">
                            <i className="icon-edit text-16 text-light-1" />
                          </button>
                        </div>
                        <div className="col-auto">
                          <button className="flex-center bg-light-2 rounded-4 size-35" onClick={()=>handleDeleteRoom(item._id)}>
                            <i className="icon-trash-2 text-16 text-light-1" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
    <Pagination
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      totalPages={Math.ceil(room.length / itemsPerPage)}
      setCurrentPage={setCurrentPage}
       />
       </>
  )
}

export default RoomListHotel
