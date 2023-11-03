import { apiSlice } from "./apiSlice";
import { REGISTER_URL,LOGIN_URL,GET_HOTEL_LIST_FOR_USER,
    GET_ROOM_DATA_FOR_USER,GET_SINGLE_HOTEL_FOR_USER,VERIFY_OTP
,SEND_OTP,USER_PROFILE,USER_ADDRESS,ADD_USER_ADDRESS,GET_DETAILS_FOR_BOOKING,PAYMENT,PAYMENT_STATUS,CREATE_BOOKING
} from "../config/api";


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
        sendOtp:builder.mutation({
            query:(data)=>({
               url:`${SEND_OTP}` ,
               method:'POST',
               body:data
            })
        }),
        verifyOtp:builder.mutation({
            query:(data)=>({
               url:`${VERIFY_OTP}` ,
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
               method:'GET', 
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
            query:(params)=>({
               url:`${GET_SINGLE_HOTEL_FOR_USER}?id=${params.id}` ,
               method:'GET'

            })
        }),
        getProfile: builder.query({
            query: (params) => ({
                url: `${USER_PROFILE}?id=${params.id}`,
                method: 'GET',
            }),
        }),
        getUserAdress: builder.query({
            query: (params) => ({
                url: `${USER_ADDRESS}?id=${params.id}`,
                method: 'GET',
            }),
        }),
        addAddress:builder.mutation({
            query:(data)=>({
               url:`${ADD_USER_ADDRESS}` ,
               method:'POST',
               body:data
            })
        }),
        getDetailsForBooking:builder.query({
            query:(params)=>({
               url:`${GET_DETAILS_FOR_BOOKING}?hotelId=${params.hotelId}&availabilityId=${params.availabilityId}&userId=${params.userId}` ,
               method:'GET'

            })
        }),
        payment:builder.mutation({
            query:(data)=>({
               url:`${PAYMENT}` ,
               method:'POST',
               body:data
            })
        }),
        paymentStatus:builder.mutation({
            query:(params)=>({
               url:`${PAYMENT_STATUS}?session_id=${params.session_id}` ,
               method:'GET',
            })
        }),
        createBooking:builder.mutation({
            query:(data)=>({
               url:`${CREATE_BOOKING}` ,
               method:'POST',
               body:data
            })
        })

    })
})
export const {useRegisterMutation,useLoginMutation,useGoogleLoginMutation,
    useLogoutMutation,useGetHotelsForUserMutation,useGetRoomDataForUserMutation,
    useGetSingleHotelDataForUserMutation,useSendOtpMutation,useCreateBookingMutation,
    useVerifyOtpMutation,useGetProfileQuery,useGetUserAdressQuery,useAddAddressMutation,
    useGetDetailsForBookingQuery,usePaymentMutation,usePaymentStatusMutation}=userApiSlice