import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function UserPrivateRoute({ children }) {

  const { userInfo } = useSelector( (state) => state.auth );
  return userInfo ? <>{children}</> : <Navigate to="/Login" />;
}

export default UserPrivateRoute;