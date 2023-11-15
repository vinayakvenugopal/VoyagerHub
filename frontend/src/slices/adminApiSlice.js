import { apiSlice } from "./apiSlice";
import {GET_ADMIN_DASHBOARD,GET_BOOKING_FOR_ADMIN,ADMIN_LOGIN,ADMIN_LOGOUT,ADMIN_GET_HOTELS ,BLOCK_HOTEL,
    UNBLOCK_HOTEL,GET_FACILITIES_FOR_ADMIN,ADD_FACILITIES,DELETE_FACILITIES,GET_COMPLAINTS,GET_USERS,BLOCK_USERS,UNBLOCK_USERS} from "../config/api";


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
            query:()=>({
               url:`${ADMIN_GET_HOTELS}` ,
               method:'GET',
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
        }),
        getFacilitiesForAdmin:builder.query({
            query:()=>({
               url:`${GET_FACILITIES_FOR_ADMIN}` ,
               method:'GET',

            })
        }),
        addFacilities:builder.mutation({
            query:(data)=>({
               url:`${ADD_FACILITIES}` ,
               method:'POST',
               body:data
            })
        }),
        delteFacilities: builder.mutation({
            query: (params) => ({
                url: `${DELETE_FACILITIES}?id=${params.id}`,
                method: 'DELETE',
                credentials: 'include',

            })
        }),
        getComplaints:builder.query({
            query:()=>({
               url:`${GET_COMPLAINTS}` ,
               method:'GET',
            })
        }),
        getAdminDashboard:builder.query({
            query:()=>({
               url:`${GET_ADMIN_DASHBOARD}` ,
               method:'GET'

            })
        }),
        getBookingsForAdmin:builder.query({
            query:()=>({
               url:`${GET_BOOKING_FOR_ADMIN}` ,
               method:'GET'

            })
        }) ,
        getUsers:builder.query({
            query:()=>({
               url:`${GET_USERS}` ,
               method:'GET'

            })
        }),
        blockUser:builder.mutation({
            query:(params)=>({
               url:`${BLOCK_USERS}?id=${params.id}` ,
               method:'GET'

            })
        }),
        unBlockUser:builder.mutation({
            query:(params)=>({
               url:`${UNBLOCK_USERS}?id=${params.id}` ,
               method:'GET'

            })
        })  
    })
})

export const {useAdminLoginMutation ,useAdminLogoutMutation,useAdminGetHotelsMutation,useBlockHotelMutation,useGetAdminDashboardQuery,useGetBookingsForAdminQuery,
    useUnBlockHotelMutation,useGetFacilitiesForAdminQuery,useAddFacilitiesMutation,useDelteFacilitiesMutation,useGetComplaintsQuery,useGetUsersQuery,useBlockUserMutation,useUnBlockUserMutation} = adminApiSlice