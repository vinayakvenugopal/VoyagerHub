import ImageUploader from "../ImageUploader/ImageUploader"
import { useEditHotelMutation } from "../../slices/hotelApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetFacilitiesQuery } from "../../slices/hotelApiSlice";
import { isHotelDetailsFormValid } from "../../utils/HotelDetailsFormValidation";

export const UpdateHotelDetailsForm = ({hotel}) => {
  const navigate = useNavigate()
  const [name,setName] = useState(hotel.name)
  const [starRating,setStarRating] = useState(hotel.starRating)
  const [videoUrl,setVideoUrl] = useState(hotel.videoUrl)
  const [desc,setDesc] = useState(hotel.desc)
  const [address,setAddress] = useState(hotel.address)
  const [images, setImages] = useState([]);
  const { hotelInfo } = useSelector( (state) => state.hotelAuth );

  const {data,error:facilitiesError,isLoading,refetch} = useGetFacilitiesQuery({})

  const [city,setCity] = useState(hotel.city)
  const [aminities, setAminities] = useState(hotel.aminities);
  console.log(aminities);
  const [error, setError] = useState("");

const [editHotel] = useEditHotelMutation()



  const handleCheckboxChange = (value) => {
    if (aminities.includes(value)) {
      setAminities(aminities.filter((item) => item !== value));
    } else {
      setAminities([...aminities, value]);
    }
  };
  const handleImageUpload = (images, error) => {
    setImages(images);
    setError(error);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();    
    const { isValid, errors } = isHotelDetailsFormValid(name, desc, address, city,starRating);
if (!isValid) {
  if (errors.name) {
    toast.error(errors.name);
    return
  } 
  if (errors.desc) {
    toast.error(errors.desc);
    return
  }
  if (errors.address) {
    toast.error(errors.address);
    return
  }
  if (errors.city) {
    toast.error(errors.city);
    return
  }
  if (errors.starRating) {
    toast.error(errors.starRating);
    return
  }
}
    try { 
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('address', address);
    formData.append('hotelierId', hotelInfo._id);
    formData.append('starRating', starRating);
    formData.append('id', hotel._id);
    formData.append('videoUrl', videoUrl);



    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
      
    }
    for (let i = 0; i < aminities.length; i++) {
      formData.append('aminities', aminities[i]);
      
    }
    
    formData.append('city', city);

    const responseFromApiCall = await editHotel(formData).unwrap()
    toast.success('Details Added Succesfully')
    navigate('/Hotel/HotelList')
  } catch (error) {
      throw new Error('Error Submitting form'+error.msg)
  }

  }
  if(isLoading){
    return(
      <h1>Loading</h1>
    )
  }
  const options = data.map(item => ({ value: item.facility }));
  
  return (
    <>

    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="row x-gap-20 y-gap-20">
    <div className="col-12">
      <div className="form-input ">
        <input type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
         />
        <label className="lh-1 text-16 text-light-1">Hotel Name</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">
        <input type="text" 
        value={starRating}
        onChange={(e) => setStarRating(e.target.value)}
         />
        <label className="lh-1 text-16 text-light-1">Star Rating(1-5)</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">
        <input type="text" 
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
         />
        <label className="lh-1 text-16 text-light-1">Video Url(Youtube)</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">

        <textarea rows={5} 
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Description</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">
        <input type="text"
         value={address}
         onChange={(e) => setAddress(e.target.value)}
          />
        <label className="lh-1 text-16 text-light-1">Address</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">
        <input type="text" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
         />
        <label className="lh-1 text-16 text-light-1">City</label>
      </div>
    </div>

    <div className="mt-30">
          <div className="fw-500">Gallery</div>
          <ImageUploader
          onImageUpload={handleImageUpload}
          currentImages={images}
          currentError={error}
          />
        </div>

        <div className="row x-gap-100 y-gap-15">
        <div className="col-12">
          <div className="text-18 fw-500">Aminities</div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="row y-gap-15">
          {options.map((option) => (

            <div className="col-12"  key={option.value}>
              <div className="d-flex items-center form-checkbox">
                <input type="checkbox" 
                name="name" 
                value={option.value}
                checked={aminities.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}

                
                />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
                <div className="text-15 lh-11 ml-10">{option.value}</div>
              </div>
            </div>
                  ))}
          </div>
        </div>
      </div>

      <div className="d-inline-block pt-30">
          <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white">
            Submit <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
  </div>
  </form>
</>
  )
}
