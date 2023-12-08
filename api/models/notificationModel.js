import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  reciever: {
    type: String,
  },
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  recieverId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;