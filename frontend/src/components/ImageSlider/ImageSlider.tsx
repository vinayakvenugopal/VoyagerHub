import Slider from "react-slick";
const HOTEL_IMAGE_DIR_PATH = 'http://localhost:5000/HotelImages/'


function ImageSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={HOTEL_IMAGE_DIR_PATH+image} 
          alt={`Slide ${index + 1}`}
        
           />
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
