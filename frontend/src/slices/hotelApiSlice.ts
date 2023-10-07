import { apiSlice } from "./apiSlice";
import { HOTEL_REGISTER,HOTEL_LOGIN ,GET_HOTEL_LIST} from "../config/api";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        hotelRegister:builder.mutation({
            query:(data)=>({
               url:`${HOTEL_REGISTER}` ,
               method:'POST',
               body:data
            })
        }),
        hotelLogin:builder.mutation({
            query:(data)=>({
               url:`${HOTEL_LOGIN }` ,
               method:'POST',
               body:data
            })
        }),
        hotelLogout:builder.mutation({
            query:()=>({
               url:`api/hotel/logout` ,
               method:'POST',
            })
        }),
        getHotelData:builder.mutation({
            query:()=>({
               url:`${GET_HOTEL_LIST}` ,
               method:'POST',
            })
        })

    })
})
export const {useHotelRegisterMutation,useHotelLoginMutation,useHotelLogoutMutation,useGetHotelDataMutation} =userApiSlice