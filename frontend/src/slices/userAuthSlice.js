import { createSlice  } from "@reduxjs/toolkit";

  


  const storedUserInfo = localStorage.getItem('userInfo');
  const initialState = {
      userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  };

const userAuthSlice = createSlice ({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
        }
    }
})


export const {setCredentials,logout} = userAuthSlice.actions
export default userAuthSlice.reducer