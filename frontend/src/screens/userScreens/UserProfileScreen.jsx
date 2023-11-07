import React, { useEffect,useState } from 'react'
import Header1 from '../../components/UserNavbar/Header1'
import { UserProfile } from '../../components/UserProfile/UserProfile'
import HeaderBodySeperator from '../../components/HeaderBodySeperator/HeaderBodySeperator'
import { useSelector,useDispatch } from 'react-redux'
import { useGetProfileQuery,useGetUserAdressQuery } from '../../slices/userApiSlice'
import AddAddressModal from '../../components/AddAddressModal/AddAddressModal'
import ComplaintModal from '../../components/ComplaintModal/ComplaintModal'
export const UserProfileScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [showComplaintModal, setShowComplaintModal] = useState(false);

    const dispatch = useDispatch(); 

    const { userInfo } = useSelector((state) => state.auth);
    const {data:userData,error:userError,isLoading:isUserLoading,refetch:refetchUserData} = useGetProfileQuery({id: userInfo._id})
    const { data:addressData, error:addressError ,isLoading:isAddressLoading,refetch:refetchAddressData} = useGetUserAdressQuery({ id: userInfo._id });

    if(userError||addressError){
      throw new Error('Error occured')
    }




    const refetchData = () => {
      refetchUserData()
      refetchAddressData()
  
    };
if(isUserLoading || isAddressLoading){
    return(
        <h1>Loading</h1>
    )
}
 
  return (   
<>
<ComplaintModal showModal={showComplaintModal} setShowModal={setShowComplaintModal}  />
<AddAddressModal showModal={showModal} setShowModal={setShowModal} refetchData={refetchData} />
<Header1/>
<div style={{marginTop:"90px"}}>
<HeaderBodySeperator />
<UserProfile  userData={userData} addressData={addressData} setShowModal={setShowModal} setShowComplaintModal={setShowComplaintModal}  />
</div>

</>    
  )
}
