import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS
import { Button, Modal, Form } from 'react-bootstrap'; // Import necessary Bootstrap components
import ImageUploader from "../ImageUploader/ImageUploader"
import { useAddRoomMutation } from '../../slices/hotelApiSlice';
import { useSelector } from 'react-redux';


function AddRoomModal({showModal,setShowModal}) {
  const [type,setType] = useState("")
  const [desc,setDesc] = useState("")
  const [area,setArea] = useState('')
  const [occupancy,setOccupancy] = useState('')
  const [noOfRooms,setNoOfRooms] = useState('')
  const [price,setPrice] = useState('')

  const [images, setImages] = useState([]);


  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };
  const { hotelInfo } = useSelector( (state) => state.hotelAuth );
  const handleImageUpload = (images, error) => {
    setImages(images);
  };
const [addRoom] = useAddRoomMutation()

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData(); 
    formData.append('type', type);
    formData.append('desc', desc);
    formData.append('area', area);
    formData.append('occupancy', occupancy);
    formData.append('noOfRooms', noOfRooms);
    formData.append('hotelierId', hotelInfo._id);
    formData.append('price',price);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
      
    }

    const responseFromApiCall = addRoom(formData).unwrap()

    handleClose();
  };





  return (
    <div className="App">
      <Modal show={showModal} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add Rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter Room Type"
              />
            </Form.Group>

            <Form.Group controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" // Use 'as' prop to render a textarea
                required
                rows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter your description"
              />
            </Form.Group>

            <Form.Group controlId="formArea">
              <Form.Label>Room Area(in Sqft)</Form.Label>
              <Form.Control
                type="number"
                name="name"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter Room Type"
              />
            </Form.Group>

            <Form.Group controlId="formOcc">
              <Form.Label>Maximum Occuppancy</Form.Label>
              <Form.Control
                type="number"
                name="name"
                value={occupancy}
                onChange={(e) => setOccupancy(e.target.value)}
                placeholder="Enter Room Type"
              />
            </Form.Group>

            <Form.Group controlId="formnoOfRooms">
              <Form.Label>No of Rooms</Form.Label>
              <Form.Control
                type="number"
                name="name"
                value={noOfRooms}
                onChange={(e) => setNoOfRooms(e.target.value)}
                placeholder="Enter Room Type"
              />
            </Form.Group>

            <Form.Group controlId="formPriceofRoom">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="name"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Room Price"
              />
            </Form.Group>


            <div className="mt-30">
          <div className="fw-500">Gallery</div>
          <ImageUploader
          onImageUpload={handleImageUpload}
          currentImages={images}
          />
        </div>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddRoomModal;
