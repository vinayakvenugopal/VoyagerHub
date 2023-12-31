import { apiSlice } from "./apiSlice";
import { HOTEL_REGISTER,HOTEL_LOGIN ,GET_HOTEL_LIST,CREATE_HOTEL,
    GET_SINGLE_HOTEL,GET_ROOM_DATA_FOR_HOTELS,ADD_ROOM_DATA,HOTEL_LOGOUT,CHANGE_BOOKING_STATUS,EDIT_HOTEL,GET_MESSAGE_FOR_HOTEL,SEND_CHAT_FOR_HOTEL,
    SEND_OTP_FOR_HOTEL,VERIFY_OTP_FOR_HOTEL,DELETE_ROOM,GET_FACILITIES,GET_BOOKINGS_FOR_HOTEL,GET_HOTEL_DASHBOARD,GET_BOOKING_FOR_HOTELIER,GET_CHATROOM} from "../config/api";


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
        }),
        getFacilities:builder.query({
            query:()=>({
               url:`${GET_FACILITIES}` ,
               method:'GET',

            })
        }),
        getBookingsForHotel:builder.query({
            query:(params)=>({
               url:`${GET_BOOKINGS_FOR_HOTEL}?id=${params.id}` ,
               method:'GET'

            })
        }),
        changeBookingStatus:builder.mutation({
            query:(params)=>({
               url:`${CHANGE_BOOKING_STATUS}?id=${params.id}&status=${params.status}&userId=${params.userId}` ,
               method:'GET'

            })
        }),
        getHotelDashboard:builder.query({
            query:(params)=>({
               url:`${GET_HOTEL_DASHBOARD}?hotelierId=${params.hotelierId}` ,
               method:'GET'

            })
        }),
        getBookingsForHotelier:builder.query({
            query:(params)=>({
               url:`${GET_BOOKING_FOR_HOTELIER}?id=${params.id}` ,
               method:'GET'

            })
        }),
        editHotel:builder.mutation({
            query:(formData)=>({
               url:`${EDIT_HOTEL}` ,
               method:'POST',
               body:formData,
               headers: {
                
              }
            })
        }),
        getChatRoom:builder.query({
            query:(params)=>({
               url:`${GET_CHATROOM}/${params.hotelier}` ,
               method:'GET'

            })
        }),
        getMessageForHotelier:builder.mutation({
            query:(params)=>({
                url: `${GET_MESSAGE_FOR_HOTEL}/${params.roomId}`, 
                method:'GET',
            })
        }),
        sendChatForHotel:builder.mutation({
            query:(data)=>({
                url: `${SEND_CHAT_FOR_HOTEL}`, 
                method:'POST',
                body:data
            })
        }) 


    })
})
export const {useHotelRegisterMutation,useHotelLoginMutation,useChangeBookingStatusMutation,
    useHotelLogoutMutation,useGetHotelListForHotelierMutation,useCreateHotelMutation,useEditHotelMutation,useSendChatForHotelMutation,
    useGetSingleHotelDataMutation,useDelteRoomMutation,useGetFacilitiesQuery,useGetBookingsForHotelQuery,useGetChatRoomQuery,useGetMessageForHotelierMutation,
    useAddRoomMutation,useSendOtpForHotelMutation,useVerifyOtpForHotelMutation,useGetRoomDataForHotelQuery,useGetHotelDashboardQuery,useGetBookingsForHotelierQuery} =userApiSlice