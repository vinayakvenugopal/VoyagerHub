import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
type UserInfo = {
    _id: string;
    name: string;
    email:string;


   
  };
  
  type AuthState = {
    auth: {
        userInfo: UserInfo | null;
      };
  };

  const storedUserInfo = localStorage.getItem('userInfo');
  const initialState: AuthState = {
    auth: {
      userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    },
  };

const userAuthSlice = createSlice ({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action:PayloadAction<UserInfo>)=>{
            state.auth.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            state.auth.userInfo=null;
            localStorage.removeItem('userInfo')
        }
    }
})


export const {setCredentials,logout} = userAuthSlice.actions
export default userAuthSlice.reducer