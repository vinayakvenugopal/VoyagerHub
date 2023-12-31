import { useState } from "react";

const Pagination = ({currentPage, handlePageClick, totalPages,setCurrentPage}) => {
  
  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderPages = (totalPages) => {
    const totalPage = totalPages; // 
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage)
    );
    return pages;
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <button className="button -blue-1 size-40 rounded-full border-light" onClick={()=>setCurrentPage(currentPage-1)}>
            <i className="icon-chevron-left text-12" />
          </button>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages(totalPages)}
            {/* <div className="col-auto">
              <div className="size-40 flex-center rounded-full">...</div>
            </div>
            <div className="col-auto">
              <div className="size-40 flex-center rounded-full">20</div>
            </div> */}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages(totalPages)}
          </div>

          <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
            {/* {currentPage} – {totalPages}  */}
            </div>
          </div>
        </div>

        <div className="col-auto md:order-2">
          <button className="button -blue-1 size-40 rounded-full border-light" onClick={()=>setCurrentPage((currentPage+1))}>
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
