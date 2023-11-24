import React from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import { useGetReviewsForAdminQuery,useHideReviewMutation,useUnHideReviewMutation} from "../../slices/adminApiSlice.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AdminDashboardHeader from "../../components/AdminDashboardHeader/AdminDashboardHeader.jsx";
export const ReviewManagement = () => {
  const { data, isLoading, isError, refetch } = useGetReviewsForAdminQuery();
  const [hideReview] = useHideReviewMutation()
  const [unHideReview] = useUnHideReviewMutation()

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleHide = async(id)=>{
    try {
      const res = await hideReview({id:id})
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      
    }

  }

  const handleUnHide = async(id)=>{
    try {
      const res = await unHideReview({id:id})
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      
    }

  }


  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
     <div className="header-margin"></div>
    <AdminDashboardHeader/>
      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <AdminSidebar />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Review Management</h1>
                <br />

                {data.slice(startIndex, endIndex).map((item, index) => (
                  <>
                    <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                      <div className="col-lg-12">
                        <div className="row x-gap-20 y-gap-20 items-center">
                          <div className="col-md-6">
                            <div className="fw-500 lh-15">{item.name}</div>
                            <div className="text-14 text-light-1 lh-15">
                              {dayjs(item.createdAt).format("DD/MM/YYYY")}
                            </div>
                          </div>
                          <div className="col-md-6 text-right">
                            <div className="d-inline-block pt-30">
                              {item.isHidden===false?
                              <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" onClick={()=>handleHide(item._id)}>
                                Hide
                              </button>:
                              <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white"  onClick={()=>handleUnHide(item._id)}>
                                UnHide
                              </button>}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex x-gap-5 items-center pt-10">
                              {Array.from({ length: item.star }).map(
                                (_, index) => (
                                  <i
                                    key={index}
                                    className="icon-star text-10 text-yellow-2"
                                  ></i>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <h5 className="fw-500 text-blue-1 mt-20">
                          {item.title}
                        </h5>
                        <p className="text-15 text-dark-1 mt-10">{item.desc}</p>
                        {/* <ReviewGallery /> */}
                      </div>
                    </div>

                    <br />
                  </>
                ))}
                <Pagination
                  currentPage={currentPage}
                  handlePageClick={handlePageClick}
                  totalPages={Math.ceil(data.length / itemsPerPage)}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
