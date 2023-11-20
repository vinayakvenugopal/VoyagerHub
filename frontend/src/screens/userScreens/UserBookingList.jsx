import React from 'react'
import UserBookingTable from '../../components/UserBookingTable/UserBookingTable'
import Header1 from '../../components/UserNavbar/Header1'
import UserChat from '../../components/UserChatModal/UserChatModal'
import { useState } from 'react'
import { useCreateChatRoomMutation } from "../../slices/userApiSlice";

export const UserBookingList = () => {
  const [createChatRoom] = useCreateChatRoomMutation();
  const [loading,setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false);
  const [chatRoom,setChatRoom] = useState('')
  const handleChat = async (userId,hotelierId) => {
    const res = await createChatRoom({user:userId,hotelier:hotelierId})
    setChatRoom(res.data)
    console.log(res);
    setModalOpen(true);
    setLoading(false)
  };

 
  return (
   <>
   <UserChat modalOpen={modalOpen} setModalOpen={setModalOpen} chatRoom={chatRoom} loading={loading} roomId={chatRoom._id}/>
   <Header1/>
   <div style={{marginTop:"90px"}}>

    <div className="dashboard">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Your Bokings</h1>
                <div className="text-15 text-light-1">
                </div>
              </div>
            </div>

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <UserBookingTable modalOpen={modalOpen} setModalOpen={setModalOpen} handleChat={handleChat} />                          
            </div>

          </div>
        </div>
        </div>
   </>
  )
}
