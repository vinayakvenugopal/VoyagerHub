import { apiSlice } from "./apiSlice";
import { HOTEL_REGISTER,HOTEL_LOGIN ,GET_HOTEL_LIST,CREATE_HOTEL,
    GET_SINGLE_HOTEL,GET_ROOM_DATA_FOR_HOTELS,ADD_ROOM_DATA,HOTEL_LOGOUT,
    SEND_OTP_FOR_HOTEL,VERIFY_OTP_FOR_HOTEL,DELETE_ROOM} from "../config/api";


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
        sendOtpForHotel:builder.mutation({
            query:(data)=>({
               url:`${SEND_OTP_FOR_HOTEL}` ,
               method:'POST',
               body:data
            })
        }),
        verifyOtpForHotel:builder.mutation({
            query:(data)=>({
               url:`${VERIFY_OTP_FOR_HOTEL}` ,
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
        getHotelListForHotelier:builder.mutation({
            query:(params)=>({
               url:`${GET_HOTEL_LIST}?id=${params.id}` ,
               method:'GET',

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
            query:(params)=>({
               url:`${GET_SINGLE_HOTEL}?id=${params.id}` ,
               method:'GET',

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
        }),
        getRoomDataForHotel: builder.query({
            query: (params) => ({
                url: `${GET_ROOM_DATA_FOR_HOTELS}?id=${params.id}`,
                method: 'GET',
            })
        }),
        delteRoom: builder.mutation({
            query: (params) => ({
                url: `${DELETE_ROOM}?id=${params.id}`,
                method: 'DELETE',
                credentials: 'include',

            })
        })


    })
})
export const {useHotelRegisterMutation,useHotelLoginMutation,
    useHotelLogoutMutation,useGetHotelListForHotelierMutation,useCreateHotelMutation,
    useGetSingleHotelDataMutation,useDelteRoomMutation,
    useAddRoomMutation,useSendOtpForHotelMutation,useVerifyOtpForHotelMutation,useGetRoomDataForHotelQuery} =userApiSlice