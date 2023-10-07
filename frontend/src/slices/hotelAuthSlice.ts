import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
type HotelInfo = {
    _id: string;
    name: string;
    email:string;


   
  };
  
  type AuthState = {
        hotelInfo: HotelInfo | null;
  };

  const storedHotelInfo = localStorage.getItem('hotelInfo');
  const initialState: AuthState = {
        hotelInfo: storedHotelInfo ? JSON.parse(storedHotelInfo) : null,
  };

const hotelAuthSlice = createSlice ({
    name:'auth',
    initialState,
    reducers:{
        setHotelCredentials:(state,action:PayloadAction<HotelInfo>)=>{
            state.hotelInfo = action.payload;
            localStorage.setItem('hotelInfo',JSON.stringify(action.payload))
        },
        logoutHotel:(state,action)=>{
            state.hotelInfo=null;
            localStorage.removeItem('hoteInfo')
        }
    }
})


export const {setHotelCredentials,logoutHotel} = hotelAuthSlice.actions
export default hotelAuthSlice.reducer