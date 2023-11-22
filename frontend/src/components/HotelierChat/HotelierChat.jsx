import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  useGetChatRoomQuery,
  useGetMessageForHotelierMutation,
  useSendChatForHotelMutation,
} from "../../slices/hotelApiSlice";
import { useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "https://voyagerhub.vinayakvenugopal.com";
var socket, selectedChatCompare;

export default function HotelierChat() {
  const [sendChat] = useSendChatForHotelMutation();
  const [getMessages] = useGetMessageForHotelierMutation();
  const [chats, setChats] = useState([]);
  console.log('CHATSWITHERROR',chats);
  const [content, setContent] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState();
  const [messageSent, setMessageSent] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const { hotelInfo } = useSelector((state) => state.hotelAuth);

  const {
    data: roomData,
    isLoading: isRoomLoading,
    refetch: roomRefetch,
  } = useGetChatRoomQuery({ hotelier: hotelInfo._id });

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", hotelInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    const enterChat = async () => {
      const res = await getMessages({ roomId: currentRoomId });
      if (res) {
        setChats(res.data);
        setMessageSent(false);
        socket.emit("join chat", currentRoomId);
      }
    };
    if (currentRoomId) {
      enterChat();
    }

    selectedChatCompare = chats
  }, [currentRoomId, messageSent]);

  const sendMessage = async () => {
    setMessageSent(false);
    const res = await sendChat({
      roomId: currentRoomId,
      sender: hotelInfo._id,
      type: "hotelier",
      content: content,
    });
    socket.emit("new message", res.data);
    setMessageSent(true);
    setContent("");
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare ||currentRoomId !== newMessageReceived.room._id) {
        console.log('notworking');
      } else {
        setChats([...chats,newMessageReceived]);
      }
    });
  });

  if (isRoomLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "#eee", overflow: "hidden" }}
    >
      <MDBRow
        style={{ overflowX: "auto", marginRight: "-15px", marginLeft: "-15px" }}
      >
        <div
          className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0"
          style={{
            overflowY: "auto",
            paddingRight: "15px",
            paddingLeft: "15px",
            height: "600px",
          }}
        >
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>

          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {roomData.map((item, index) => (
                  <li
                    onClick={() => setCurrentRoomId((prevId) => item._id)}
                    className="p-2 border-bottom"
                    style={{ backgroundColor: "#eee" }}
                  >
                    <a href="#!" className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{item.user.name}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </div>

        <div
          className="col-md-6 col-lg-7 col-xl-8"
          style={{
            overflowY: "auto",
            paddingRight: "15px",
            paddingLeft: "15px",
            height: "600px",
          }}
        >
          <MDBTypography listUnStyled>
            {chats &&
              chats.map((item, index) => (
                <>
                  {item.senderType === "hotelier" ? (
                    <li className="d-flex justify-content-between mb-4">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                        width="60"
                      />
                      <MDBCard className="w-100">
                        <MDBCardHeader className="d-flex justify-content-between p-3">
                          <p className="fw-bold mb-0">You</p>
                          <p className="text-muted small mb-0">
                            <MDBIcon far icon="clock" />
                          </p>
                        </MDBCardHeader>
                        <MDBCardBody>
                          <p className="mb-0">{item.content}</p>
                        </MDBCardBody>
                      </MDBCard>
                    </li>
                  ) : (
                    <li class="d-flex justify-content-between mb-4">
                      <MDBCard className="w-100">
                        <MDBCardHeader className="d-flex justify-content-between p-3">
                          <p class="fw-bold mb-0">{item.sender.name}</p>
                        </MDBCardHeader>
                        <MDBCardBody>
                          <p className="mb-0">{item.content}</p>
                        </MDBCardBody>
                      </MDBCard>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                        width="60"
                      />
                    </li>
                  )}
                </>
              ))}
            <li className="bg-white mb-3">
              <textarea
                id="textAreaExample"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
            </li>
            <button
              rounded
              className="float-end button h-50 px-24 -dark-1 bg-blue-1 text-white"
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </MDBTypography>
        </div>
      </MDBRow>
    </MDBContainer>
  );
}
