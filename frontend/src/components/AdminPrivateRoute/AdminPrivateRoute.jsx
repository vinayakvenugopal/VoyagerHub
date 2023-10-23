import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function AdminPrivateRoute({ children }) {

  const { adminInfo } = useSelector( (state) => state.adminAuth );
  return adminInfo ? <>{children}</> : <Navigate to="/Admin/Login" />;
}

export default AdminPrivateRoute;