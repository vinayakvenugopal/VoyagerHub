import React, { useEffect,useState } from 'react'
import Header1 from '../../components/UserNavbar/Header1'
import { UserProfile } from '../../components/UserProfile/UserProfile'
import HeaderBodySeperator from '../../components/HeaderBodySeperator/HeaderBodySeperator'
import { useSelector } from 'react-redux'
import { useGetProfileQuery,useGetUserAdressQuery } from '../../slices/userApiSlice'
export const UserProfileScreen = () => {
    

    const { userInfo } = useSelector((state) => state.auth);
    const {data:userData,error:userError,isLoading:isUserLoading} = useGetProfileQuery({id: userInfo._id})
    const { data:addressData, error:addressError ,isLoading:isAddressLoading} = useGetUserAdressQuery({ id: userInfo._id });


if(isUserLoading || isAddressLoading){
    return(
        <h1>Loading</h1>
    )
}
 
  return (   
<>
<Header1/>
<div style={{marginTop:"90px"}}>
<HeaderBodySeperator />
<UserProfile  userData={userData} addressData={addressData}/>
</div>

</>    
  )
}
