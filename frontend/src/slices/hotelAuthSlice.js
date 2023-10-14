import { createSlice  } from "@reduxjs/toolkit";



  const storedHotelInfo = localStorage.getItem('hotelInfo');
  const initialState = {
        hotelInfo: storedHotelInfo ? JSON.parse(storedHotelInfo) : null,
  };

const hotelAuthSlice = createSlice ({
    name:'hotelAuth',
    initialState,
    reducers:{
        setHotelCredentials:(state,action)=>{
            state.hotelInfo = action.payload;
            localStorage.setItem('hotelInfo',JSON.stringify(action.payload))
        },
        logoutHotel:(state,action)=>{
            state.hotelInfo=null;
            localStorage.removeItem('hotelInfo')
        }
    }
})


export const {setHotelCredentials,logoutHotel} = hotelAuthSlice.actions
export default hotelAuthSlice.reducer 