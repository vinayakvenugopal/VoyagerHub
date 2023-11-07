import { useState } from "react";
import { useGetComplaintsQuery } from "../../slices/adminApiSlice";


const ComplaintsTable = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Complaints",

  ];
  const {data,isLoading,refetch,isError} = useGetComplaintsQuery()

  if(isLoading){
    return(
        <h1>Loading.....</h1>
    )
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
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Complaint</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((item,index)=>(
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td title={item.message}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1, 
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>{item.message}
                </td>
                  </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default ComplaintsTable;
