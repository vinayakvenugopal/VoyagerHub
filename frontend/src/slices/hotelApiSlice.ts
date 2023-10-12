import { apiSlice } from "./apiSlice";
import { HOTEL_REGISTER,HOTEL_LOGIN ,GET_HOTEL_LIST,CREATE_HOTEL,
    GET_SINGLE_HOTEL,GET_ROOM_DATA,GET_ROOM_DATA_FOR_HOTELS,ADD_ROOM_DATA,HOTEL_LOGOUT} from "../config/api";


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
               url:HOTEL_LOGOUT ,
               method:'POST',
            })
        }),
        getHotelData:builder.mutation({
            query:()=>({
               url:`${GET_HOTEL_LIST}` ,
               method:'POST',
            })
        }),
        createHotel:builder.mutation({
            query:(formData)=>({
               url:`${CREATE_HOTEL}` ,
               method:'POST',
               body:formData,
               headers: {
                
              }
            })
        }),
        getSingleHotelData:builder.mutation({
            query:(data)=>({
               url:`${GET_SINGLE_HOTEL}` ,
               method:'POST',
               body:data

            })
        }),
        getRoomData:builder.mutation({
            query:(data)=>({
               url:`${GET_ROOM_DATA}` ,
               method:'POST',
               body:data

            })
        }),
        getRoomDataForHotel:builder.mutation({
            query:(data)=>({
               url:`${GET_ROOM_DATA_FOR_HOTELS}` ,
               method:'POST',
               body:data

            })
        }),
        addRoom:builder.mutation({
            query:(formData)=>({
               url:`${ADD_ROOM_DATA}` ,
               method:'POST',
               body:formData,
               headers: {
              }
            })
        })


    })
})
export const {useHotelRegisterMutation,useHotelLoginMutation,
    useHotelLogoutMutation,useGetHotelDataMutation,useCreateHotelMutation,
    useGetSingleHotelDataMutation,useGetRoomDataMutation,
    useGetRoomDataForHotelMutation,useAddRoomMutation} =userApiSlice