import mongoose from 'mongoose'

const chatRoom = mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User' 
    },
    hotelier: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'hotelier'
    }, 

    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
})

const ChatRoom = mongoose.model('chatRoom',chatRoom);

export default ChatRoom ;