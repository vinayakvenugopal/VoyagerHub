import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessage.js";

const createChatRoom = async(req,res,next) =>{

    try {
        const { user, hotelier } = req.params
        let chatRoom = await ChatRoom.findOne({
            user:user,
            hotelier:hotelier
        })
        if(!chatRoom){    
            chatRoom = new ChatRoom({
                user:user,
                hotelier:hotelier,
                messages:[]
            })
            await chatRoom.save();
        }
        const roomDetails = await ChatRoom.findOne({_id:chatRoom._id}).populate({path:'hotelier',select:'_id name email'})
        res.status(200).json(roomDetails); 
    } catch (error) {
        next(error)
        
    }
}


const sendChat = async(req,res,next) => {
    try {
        const { content,roomId, sender, type } = req.body;
      
        const newMessage = new ChatMessage({
          room: roomId,
          sender: sender,
          senderType: type,
          content: content,
        });
        await newMessage.save();
        let chatRoom = await ChatRoom.findOne({_id:roomId})
        if(chatRoom){
            chatRoom.messages.push(newMessage._id)
        }
        await chatRoom.save()
        await newMessage.populate([
          { path: 'sender', select: '_id name email' },
          { path: 'room', populate: [{ path: 'user', select: '_id name email' }, { path: 'hotelier', select: '_id name email' }] },
        ]);
        res.json(newMessage);
        
    } catch (error) {
        next(error)
    }
}

const getMessages = async(req,res,next)=>{
    const { roomId } = req.params;
    try {
      const messages = await ChatMessage.find({ room: roomId }).sort({ createdAt: 1 }).populate([
        { path: 'sender', select: '_id name email' }]);
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ message: 'No messages found for the given room.' });
      }
    } catch (error) {
      next(error)
    }
}


const getChatRooms = async(req,res,next) =>{
  try {
    const { hotelier } = req.params
    console.log(hotelier);
    const rooms = await ChatRoom.find({hotelier:hotelier}).populate({path:'user',select:'_id name email'})
    if(rooms){
        res.status(200).json(rooms)
    }else{
        res.status(400).json({message:"Failed to fetch rooms"})
    }
  } catch (error) {
    next(error)
    
  }
}


export {
    createChatRoom,
    sendChat,
    getMessages,
    getChatRooms
}