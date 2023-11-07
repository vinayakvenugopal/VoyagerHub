import { apiSlice } from "./apiSlice";
import {ADMIN_LOGIN,ADMIN_LOGOUT,ADMIN_GET_HOTELS ,BLOCK_HOTEL,UNBLOCK_HOTEL,GET_FACILITIES_FOR_ADMIN,ADD_FACILITIES,DELETE_FACILITIES,GET_COMPLAINTS} from "../config/api";


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
        })
    })
})

export const {useAdminLoginMutation ,useAdminLogoutMutation,useAdminGetHotelsMutation,useBlockHotelMutation,
    useUnBlockHotelMutation,useGetFacilitiesForAdminQuery,useAddFacilitiesMutation,useDelteFacilitiesMutation,useGetComplaintsQuery} = adminApiSlice