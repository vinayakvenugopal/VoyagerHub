import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function HotelPrivateRoute({ children }) {

  const { hotelInfo } = useSelector( (state) => state.hotelAuth );
  return hotelInfo ? <>{children}</> : <Navigate to="/Hotel/Login" />;
}

export default HotelPrivateRoute;