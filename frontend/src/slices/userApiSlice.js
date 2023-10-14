import { apiSlice } from "./apiSlice";
import { REGISTER_URL,LOGIN_URL,GET_HOTEL_LIST_FOR_USER,GET_ROOM_DATA_FOR_USER,GET_SINGLE_HOTEL_FOR_USER } from "../config/api";


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
        }),
        getHotelsForUser:builder.mutation({
            query:()=>({
               url:`${GET_HOTEL_LIST_FOR_USER}` ,
               method:'POST', 
            })
        }),
        getRoomDataForUser:builder.mutation({
            query:(data)=>({
               url:`${GET_ROOM_DATA_FOR_USER}` ,
               method:'POST',
               body:data

            })
        }),
        getSingleHotelDataForUser:builder.mutation({
            query:(data)=>({
               url:`${GET_SINGLE_HOTEL_FOR_USER}` ,
               method:'POST',
               body:data

            })
        })

    })
})
export const {useRegisterMutation,useLoginMutation,useGoogleLoginMutation,
    useLogoutMutation,useGetHotelsForUserMutation,useGetRoomDataForUserMutation,useGetSingleHotelDataForUserMutation} =userApiSlice