import ImageUploader from "../ImageUploader/ImageUploader"
import { useCreateHotelMutation } from "../../slices/hotelApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";


export const HotelDetailsForm = () => {
  const options= [
    { value: 'Wifi' },
    { value: 'SPA' },
    { value: 'BAR' },
    { value: 'CAB' },
    { value: 'POOL' },
    { value: 'VILLA'},
  ];
  const [name,setName] = useState<string>("")
  const [desc,setDesc] = useState<string>("")
  const [address,setAddress] = useState<string>("")
  const [images, setImages] = useState<string[]>([]);
  console.log(images);
  
  const [city,setCity] = useState<string>("")
  const [aminities, setAminities] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

const [createHotel] = useCreateHotelMutation()
  const handleCheckboxChange = (value: string) => {
    if (aminities.includes(value)) {
      setAminities(aminities.filter((item) => item !== value));
    } else {
      setAminities([...aminities, value]);
    }
  };
  const handleImageUpload = (images: string[], error: string) => {
    setImages(images);
    setError(error);
  };

  const handleSubmit = (e:any)=>{
    e.preventDefault();    
    try { 
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('address', address);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
      
    }
    // formData.append('images', images[0]);
    for (let i = 0; i < aminities.length; i++) {
      formData.append('aminities', aminities[i]);
      
    }
    

    formData.append('city', city);
    // formData.append('aminities', JSON.stringify(aminities));

    const responseFromApiCall = createHotel(formData).unwrap()
  } catch (error) {
      
  }

  }


  return (
    <>
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="row x-gap-20 y-gap-20">
    <div className="col-12">
      <div className="form-input ">
        <input type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required />
        <label className="lh-1 text-16 text-light-1">Hotel Name</label>
      </div>
    </div>
    {/* End Name */}

    <div className="col-12">
      <div className="form-input ">

        <textarea required rows={5} 
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        />
      
        <label className="lh-1 text-16 text-light-1">Description</label>
      </div>
    </div>
    {/* End Content */}

    <div className="col-12">
      <div className="form-input ">
        <input type="text"
         value={address}
         onChange={(e) => setAddress(e.target.value)}
         required />
        <label className="lh-1 text-16 text-light-1">Address</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-input ">
        <input type="text" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required />
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
        {/* End .col-12 */}

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
