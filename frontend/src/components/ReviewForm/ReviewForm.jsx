import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useAddReviewMutation } from "../../slices/userApiSlice";
import {toast} from 'react-toastify'
const ReviewForm = ({hotelId,refetch}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const [star, setStar] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const ratingChanged = (newRating) => {
    setStar(newRating);
  };
  const [addReview] = useAddReviewMutation()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(star===0){
      toast.error('Atleast 1 star should be given')
      return
    }
    if(name.trim()==''){
      toast.error('Name is Required')
      return
    }

    if(title.trim()==''){
      toast.error('Title is Required')
      return
    }

    if(desc.trim()==''){
      toast.error('Description is Required')
      return
    }
    try {
      const response = await addReview({
        userId,
        hotelId,
        star,
        name,
        title,
        desc
      }).unwrap()
      refetch()
      toast.success("Review Added")
    } catch (error) {
      toast.error('Error Adding Review')
      
    }
  }


  return (
    <form className="row y-gap-30 pt-20" onSubmit={handleSubmit}>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={30}
        activeColor="#ffd700"
      />
      <div className="col-xl-6">
        <div className="form-input ">
          <input type="text" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
           />
          <label className="lh-1 text-16 text-light-1">Name</label>
        </div>
      </div>

      <div className="col-xl-6">
        <div className="form-input ">
          <input type="text" 
           value={title}
          onChange={(e)=>setTitle(e.target.value)}
           />
          <label className="lh-1 text-16 text-light-1">Title</label>
        </div>
      </div>

      <div className="col-12">
        <div className="form-input ">
          <textarea rows={4} defaultValue={""}
          value={desc}
          onChange={(e)=>setDesc(e.target.value)} />
          <label className="lh-1 text-16 text-light-1">
            Write Your Comment
          </label>
        </div>
      </div>

      <div className="col-auto">
        <button
          type="submit"
          className="button -md -dark-1 bg-blue-1 text-white"
        >
          Post Review <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default ReviewForm;
