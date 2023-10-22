import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'; 
import { useAddAddressMutation } from '../../slices/userApiSlice';
import { useSelector } from 'react-redux';


const AddAddressModal = ({showModal,setShowModal,refetchData}) => {
  const [address,setAddress] = useState("")
  const [locality,setLocality] = useState("")
  const [pincode,setPincode] = useState("")
  const [state,setState] = useState("")
  const [country,setCountry] = useState("")
  const { userInfo } = useSelector( (state) => state.auth );

  const [addAddress] = useAddAddressMutation()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await addAddress({address,locality,pincode,state,country,userId:userInfo._id}).unwrap()
            setShowModal(false)
            refetchData()
        } catch (error) {
            console.log(error);
            
        }
    }


  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>

    <Modal.Header closeButton>
      <Modal.Title style={{paddingLeft:"35%"}}>Add Adress</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Locality</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="Enter Room Type"
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Room Type"
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter Room Type"
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter Room Type"
          />
        </Form.Group>

    
  

 



        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal.Body>
    <Modal.Footer>
     
      <Button variant="secondary">
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default AddAddressModal;
