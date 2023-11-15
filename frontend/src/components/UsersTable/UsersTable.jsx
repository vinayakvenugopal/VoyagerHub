import { useState } from "react";
import { useGetUsersQuery } from "../../slices/adminApiSlice";
import Pagination from "../Pagination/Pagination";
import { useBlockUserMutation,useUnBlockUserMutation } from "../../slices/adminApiSlice";


const UsersTable = () => {
  const [blockUser] = useBlockUserMutation()
  const [unBlockUser] = useUnBlockUserMutation() 


  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Users",
    "Blocked Users",


  ];
  const {data,isLoading,refetch,isError} = useGetUsersQuery()


  const handleBlock = async(id) =>{
    const res = await blockUser({id:id})
    refetch()
  }

  const handleUnblock = async(id) =>{
    const res = await unBlockUser({id:id})
    refetch()
  }

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if(isLoading){
    return(
        <h1>Loading.....</h1>
    )
  }

  let length = data.length

  if(activeTab===1){
    length = data.filter((item)=>item.isBlocked===true).length
  }


  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {activeTab===0&& <tbody>
                {data.slice(startIndex,endIndex).map((item,index)=>(
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.isBlocked===true?'Blocked':'Active'}</td>
                    <td>
                      {item.isBlocked===true?
                      <button className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white" onClick={()=>handleUnblock(item._id)}>UnBlock</button>:
                      <button className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white" onClick={()=>handleBlock(item._id)}>Block</button>
                      }
                    </td>
                  </tr>
                  ))}

                  

                </tbody>}

                {activeTab===1&& <tbody>
                {data.filter((item)=>item.isBlocked===true).slice(startIndex,endIndex).map((item,index)=>(
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.isBlocked===true?'Blocked':'Active'}</td>
                    <td>
                      {item.isBlocked===true?
                      <button className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white" onClick={()=>handleUnblock(item._id)}>UnBlock</button>:
                      <button className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-dark text-white" onClick={()=>handleBlock(item._id)}>Block</button>
                      }
                    </td>
                  </tr>
                  ))}

                  

                </tbody>}



              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      totalPages={Math.ceil(length / itemsPerPage)}
      setCurrentPage={setCurrentPage}
       />
    </>
  );
};

export default UsersTable;
