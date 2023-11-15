import React from 'react';
import './UserProfile.css'
export const UserProfile = ({userData,addressData,setShowModal,setShowComplaintModal}) => {
    console.log(userData);
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{userData?.name}</h4>
                    {/* <p className="text-secondary mb-1"></p>
                    <p className="text-muted font-size-sm"></p>
                    <button className="btn btn-outline-primary"></button> */}
                    <button className="btn btn-secondary" onClick={()=>setShowComplaintModal(true)}>Register Complaint</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userData?.name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userData?.email}
                  </div>
                </div>
                <hr />
               
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userData?.mobile}
                  </div>
                </div>
                <hr />

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Wallet</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  ₹ {userData?.wallet}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                 {addressData ? 
                 <div className="col-sm-9 text-secondary">
                  {addressData.address} , {addressData.locality}
                  <br />
                  {addressData.pincode} {addressData.state}
                  <br />
                  {addressData.country}
                  </div>:
                  <div className="col-sm-9 text-secondary" onClick={()=>setShowModal(true)}>
                  <a className="btn btn-info">Add Address</a>
                  </div>
                  }
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
