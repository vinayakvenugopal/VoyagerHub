import React from 'react'
import Header1 from '../../components/UserNavbar/Header1';
import InvoicePage from '../../components/InvoicePage/InvoicePage';


export const InvoiceUserPage = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookingId = urlParams.get("bookingId");
  return (
    <>
    <Header1/>
    <InvoicePage id={bookingId} />
    </>
  )
}
