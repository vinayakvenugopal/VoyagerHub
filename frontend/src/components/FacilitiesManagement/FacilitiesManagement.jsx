import React, { useState } from "react";
import { useGetFacilitiesForAdminQuery,useAddFacilitiesMutation,useDelteFacilitiesMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

export const FacilitiesManagement = () => {
  const [facility, setFacility] = useState("");
    const [addFacilities] = useAddFacilitiesMutation()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await addFacilities({facility}).unwrap()
        handleRefetch()
        toast.success('Facility Added')
        setFacility("")
    } catch (error) {
        console.log(error);
    }

  };

const [deleteFacilities] = useDelteFacilitiesMutation()
const handleDelete = (id)=>{
    deleteFacilities({id:id})
    toast.success('Facility Deleted')
    handleRefetch()
}

  const { data, error, isLoading, refetch } = useGetFacilitiesForAdminQuery({});

  const handleRefetch = ()=>{
    refetch()
  }
  
  if(error){
    throw new Error('An error occured')
  }

  if (isLoading) {
    return <h1>Loading.......</h1>;
  }

  return (
    <>
      Add Facilities
      <form
        action=""
        onClick={handleSubmit}
        encType="multipart/form-data"
        style={{ marginTop: "10px" }}
      >
        <div className="row x-gap-20 y-gap-20">
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">Facility Name</label>
            </div>
          </div>

          <div className="d-inline-block pt-30">
            <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white">
              Submit <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </div>
      </form>
      <div className="tabs__content pt-30 js-tabs-content">
        <div className="tabs__pane -tab-item-1 is-tab-el-active">
          <div className="overflow-scroll scroll-bar-1">
            <table className="table-4 -border-bottom col-12">
              <thead className="bg-light-2">
                <tr>
                  <th>Facilities</th>
                  <th>Delte</th>
                </tr>
              </thead>
              {/* End theade */}
              <tbody>
              {data.map((item)=>
                <tr>
                  <td className="text-blue-1 fw-500">{item.facility}</td>

                  <td>
                    <div className="row x-gap-10 y-gap-10 items-center">
                      <div className="col-auto">
                        <button className="flex-center bg-light-2 rounded-4 size-35" onClick={()=>handleDelete(item._id)}>
                          <i className="icon-trash-2 text-16 text-light-1" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                )}

                {/* End tr */}
              </tbody>
              {/* End tbody */}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
