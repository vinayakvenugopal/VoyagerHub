import { apiSlice } from "./apiSlice";
import { REGISTER_URL,LOGIN_URL,GOOGLE_AUTH_URL } from "../config/api";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
               url:`${REGISTER_URL}` ,
               method:'POST',
               body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
               url:`${LOGIN_URL}` ,
               method:'POST',
               body:data
            })
        }),
        googleLogin:builder.mutation({
            query:(data)=>({
               url:`${'api/auth/googleLogin'}` ,
               method:'POST',
               body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
               url:`api/auth/logout` ,
               method:'POST',
            })
        })

    })
})
export const {useRegisterMutation,useLoginMutation,useGoogleLoginMutation,useLogoutMutation} =userApiSlice