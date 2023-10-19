import { apiSlice } from "./apiSlice";
import {ADMIN_LOGIN,ADMIN_LOGOUT,ADMIN_GET_HOTELS ,BLOCK_HOTEL,UNBLOCK_HOTEL} from "../config/api";


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_LOGIN}` ,
               method:'POST',
               body:data
            })
        }), 
        adminLogout:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_LOGOUT}` ,
               method:'POST',
               body:data
            })
        }),
        adminGetHotels:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_GET_HOTELS}` ,
               method:'POST',
               body:data
            })
        }),
        blockHotel:builder.mutation({
            query:(data)=>({
               url:`${BLOCK_HOTEL}` ,
               method:'POST',
               body:data
            })
        }),
        unBlockHotel:builder.mutation({
            query:(data)=>({
               url:`${UNBLOCK_HOTEL}` ,
               method:'POST',
               body:data
            })
        })
    })
})

export const {useAdminLoginMutation ,useAdminLogoutMutation,useAdminGetHotelsMutation,useBlockHotelMutation,useUnBlockHotelMutation} = adminApiSlice