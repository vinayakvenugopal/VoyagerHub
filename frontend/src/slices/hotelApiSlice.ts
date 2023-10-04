import { apiSlice } from "./apiSlice";
import { HOTEL_REGISTER,HOTEL_LOGIN } from "../config/api";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
               url:`${HOTEL_REGISTER}` ,
               method:'POST',
               body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
               url:`${HOTEL_LOGIN }` ,
               method:'POST',
               body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
               url:`api/hotel/logout` ,
               method:'POST',
            })
        })

    })
})
export const {useRegisterMutation,useLoginMutation,useLogoutMutation} =userApiSlice