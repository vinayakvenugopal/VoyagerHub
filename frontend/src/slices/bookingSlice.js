// In your Redux slice (e.g., bookingSlice.js):
import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    userInfo: {}, // User information
    hotelDetails: {}, // Hotel details
    roomDetails: {}, // Room details
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setHotelDetails: (state, action) => {
      state.hotelDetails = action.payload;
    },
    setRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
  },
});

export const { setUserInfo, setHotelDetails, setRoomDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
