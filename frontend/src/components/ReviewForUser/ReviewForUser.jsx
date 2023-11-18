import dayjs from "dayjs";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
const ReviewForUser = ({data}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const itemsPerPage = 2;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;  
 
  return (
    <div className="row y-gap-60" style={{backgroundColor:'rgb(255,255,240)'}}>



       {data.slice(startIndex,endIndex).map((item)=>(

       <div className="col-lg-6">
        <div className="row x-gap-20 y-gap-20 items-center">
          {/* <div className="col-auto">
            <img
              width={60}
              height={60}
              src="/img/avatars/2.png"
              alt="image"
            />
          </div> */}
          <div className="col-auto">
            <div className="fw-500 lh-15">{item.name}</div>
            <div className="text-14 text-light-1 lh-15">{dayjs(item.createdAt).format("DD/MM/YYYY")}</div>
            
          </div>

          <div className="d-flex x-gap-5 items-center pt-10">
              {Array.from({ length: item.star }).map((_, index) => (
                      <i
                        key={index}
                        className="icon-star text-10 text-yellow-2"
                      ></i>
                    ))}
              </div>
        </div>

        <h5 className="fw-500 text-blue-1 mt-20">{item.title}</h5>
        <p className="text-15 text-dark-1 mt-10">
          {item.desc}{" "}
        </p>
        {/* <ReviewGallery /> */}
      </div>
      
       ))}
       
    
      
       <Pagination
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      totalPages={Math.ceil(data.length / itemsPerPage)}
      setCurrentPage={setCurrentPage}
       />
    </div>

  );
};

export default ReviewForUser;
