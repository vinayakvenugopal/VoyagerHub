import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
type UserInfo = {
    _id: string;
    name: string;
    email:string;


   
  };
  
  type AuthState = {
        userInfo: UserInfo | null;
 
  };

  const storedUserInfo = localStorage.getItem('userInfo');
  const initialState: AuthState = {
      userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  };

const userAuthSlice = createSlice ({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action:PayloadAction<UserInfo>)=>{
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