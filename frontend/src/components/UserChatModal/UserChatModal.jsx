import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import { useSendChatMutation,useGetMessageMutation } from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
const ENDPOINT = 'https://voyagerhub.vinayakvenugopal.com/';
var socket,selectedChatCompare;

const UserChat = ({modalOpen, setModalOpen,chatRoom,loading,roomId}) => {
  const [sendChat] = useSendChatMutation()
  const [getMessages] = useGetMessageMutation()
  const { userInfo } = useSelector((state) => state.auth);

  const [message,setMessage] = useState('')
  const [messageSent,setMessageSent] = useState(false)
  const [socketConnected,setSocketConnected] = useState(false)
  const [chats,setChats] = useState([]);
  


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    let fetchMessages = async () => {
        let res = await getMessages({roomId:roomId})
        if (res) {
            setChats(res.data)
            console.log(chats,'chats');
            setMessageSent(false)
            socket.emit("join chat",roomId)
        }
    };
    if(roomId){
        fetchMessages();
    }
    selectedChatCompare = chats;
}, [roomId,messageSent]);

  const sendMessage = async() =>{
    if(message.trim()===''){
      return toast.error("Message is empty")
    }
    const res = await sendChat({roomId:roomId,sender:userInfo._id,type:'User',content:message})
    setMessageSent(true)
    setMessage('')
    socket.emit('new message',res.data)
  }

  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit("setup",userInfo)
    socket.on('connection',()=>setSocketConnected(true))
},[])

useEffect(() => {
  socket.on('message received',(newMessageReceived)=>{
      if(!selectedChatCompare || roomId!==newMessageReceived.room._id){

      }else{
          setChats([...chats,newMessageReceived])
      }
  })
})


  
  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  return (
    <Container fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <Row className="d-flex justify-content-center">
        <Col md="10" lg="8" xl="6">
          <Button variant="primary" size="sm" onClick={openModal}>
            Open Chat Modal
          </Button>

          <Modal show={modalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Chat with {chatRoom.hotelier.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

          {chats.map((item,index)=>(

            
            <> 
            
          {item.senderType==="hotelier" ? <div className="d-flex flex-row justify-content-start" key={index}>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div>
                  <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                  >
                    {item.content}
                  </p>
                  <p className="small ms-3 mb-3 rounded-3 text-muted"></p>
                </div>
              </div>:

             

              <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                  <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                    {item.content}
                  </p>
                  <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>
            }
              </>
              ))}
              

            </Modal.Body>
            <Modal.Footer>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Type message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
              />
              <a className="ms-1 text-muted" href="#!">
                <MDBIcon fas icon="paperclip" />

              </a>
              <a className="ms-3 text-muted" href="#!">
                {/* Add your smile icon */}
              </a>
              <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" href="#!" onClick={()=>sendMessage()}>
              Send
              </button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default UserChat;
