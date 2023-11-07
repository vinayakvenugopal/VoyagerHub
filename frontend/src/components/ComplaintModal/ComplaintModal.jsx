import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'; 
import { useSubmitComplaintMutation } from '../../slices/userApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ComplaintModal = ({ showModal, setShowModal }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  console.log(subject,message);

  const [submitComplaint] = useSubmitComplaintMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitComplaint({ userId: userInfo._id,name:userInfo.name,email:userInfo.email,subject:subject,message:message }).unwrap();
      setShowModal(false);
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
        <Modal.Title style={{ paddingLeft: "35%" }}>Grievances</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </Form.Group>
          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea" // Use "as" prop to specify a textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
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

export default ComplaintModal;
