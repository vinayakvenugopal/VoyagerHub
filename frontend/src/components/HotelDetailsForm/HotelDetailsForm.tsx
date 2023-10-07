import ImageUploader from "../ImageUploader/ImageUploader"



export const HotelDetailsForm = () => {
  return (
    <>
    <div className="row x-gap-20 y-gap-20">
    <div className="col-12">
      <div className="form-input ">
        <input type="text" required />
        <label className="lh-1 text-16 text-light-1">Hotel Name</label>
      </div>
    </div>
    {/* End Name */}

    <div className="col-12">
      <div className="form-input ">
        <textarea required rows={5} defaultValue={""} />
        <label className="lh-1 text-16 text-light-1">Description</label>
      </div>
    </div>
    {/* End Content */}

    <div className="col-12">
      <div className="form-input ">
        <input type="text" required />
        <label className="lh-1 text-16 text-light-1">Address</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">
        <input type="text" required />
        <label className="lh-1 text-16 text-light-1">City</label>
      </div>
    </div>

    <div className="mt-30">
          <div className="fw-500">Gallery</div>
          <ImageUploader/>
        </div>

  </div>

</>
  )
}
