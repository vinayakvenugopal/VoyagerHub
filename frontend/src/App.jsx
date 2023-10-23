// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import RegisterScreen from './screens/userScreens/RegisterScreen.jsx'
// import LoginScreen from "./screens/userScreens/LoginScreen.jsx";
// import HotelList from "./screens/userScreens/HotelList.jsx";
// import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.jsx";
// import AddHotelDetailsScreen from "./screens/hotelScreens/AddHotelDetailsScreen.jsx";
// import LoginHotel from "./screens/hotelScreens/LoginHotel.jsx";
// import HotelSinglePage from "./screens/userScreens/HotelSinglePage.jsx";
// import RoomList from "./screens/hotelScreens/RoomList.jsx";
// import HotelPrivateRoute from "./components/HotelPrivateRoute/HotelPrivateRoute.jsx";
// import AdminLogin from "./screens/adminScreens/AdminLogin.jsx";
// import HotelListForAdmin from "./screens/adminScreens/HotelListForAdmin.jsx";
// import HotelDetailsScreen from "./screens/hotelScreens/HotelDetailsScreen.jsx";
// import HotelListScreen from "./screens/hotelScreens/HotelListScreen.jsx";
// import { UserProfileScreen } from "./screens/userScreens/UserProfileScreen.jsx";
// import FacilitiesManagementScreen from "./screens/adminScreens/FacilitiesManagementScreen.jsx";
// import AdminPrivateRoute from "./components/AdminPrivateRoute/AdminPrivateRoute.jsx";
// import UserPrivateRoute from "./components/UserPrivateRoute/UserPrivateRoute.jsx";
// import ErrorPage from "./components/ErrorComponent/ErrorComponent.jsx";

// function App() {
//   return ( 
//     <div>
//       <BrowserRouter>      
//       <Routes>  
//       {/* ...................USER SCREENS START................................ */}

//       <Route path="/register" errorElement={<ErrorPage/>} element={<RegisterScreen/>}/>
//       <Route path="/login" element={<LoginScreen/>}/>
//       <Route path="/" element={<HotelList/>}/>
//       <Route path="/hotel-single/:id" element={<HotelSinglePage/>}/>
//       <Route path="/profile"  element={<UserPrivateRoute><UserProfileScreen/></UserPrivateRoute>}/>   


//       {/* ...................USER SCREENS END................................ */}

//       {/* ...................HOTELIER SCREENS START................................ */}

//       <Route path="/Hotel/Register" element={<RegisterHotelier/>}/>
//       <Route path="/Hotel/Login" element={<LoginHotel/>}/>
//       <Route path="/Hotel/Rooms/:id" element={<HotelPrivateRoute><RoomList/></HotelPrivateRoute>}/>   
//       <Route path="/Hotel/AddDetails" element= {<HotelPrivateRoute> <AddHotelDetailsScreen /> </HotelPrivateRoute> }/>                                 
//       <Route path="/Hotel/Details/:id" element= {<HotelPrivateRoute> <HotelDetailsScreen /> </HotelPrivateRoute> }/>                                 
//       <Route path="/Hotel/HotelList" element= {<HotelPrivateRoute> <HotelListScreen /> </HotelPrivateRoute> }/>                                 

                                                   
//       {/* ...................HOTELIER SCREENS END................................ */}

//       {/* ...................ADMIN SCREENS START................................ */}
//       <Route path="/Admin/Login" element={<AdminLogin/>}/>
//       <Route path="/Admin/Hotels" element={<AdminPrivateRoute><HotelListForAdmin/></AdminPrivateRoute>}/>
//       <Route path="/Admin/Facilities" element={<AdminPrivateRoute><FacilitiesManagementScreen/></AdminPrivateRoute>}/>


//       {/* ...................ADMIN SCREENS END................................ */}


      

//       </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterScreen from "./screens/userScreens/RegisterScreen.jsx";
import LoginScreen from "./screens/userScreens/LoginScreen.jsx";
import HotelList from "./screens/userScreens/HotelList.jsx";
import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.jsx";
import AddHotelDetailsScreen from "./screens/hotelScreens/AddHotelDetailsScreen.jsx";
import LoginHotel from "./screens/hotelScreens/LoginHotel.jsx";
import HotelSinglePage from "./screens/userScreens/HotelSinglePage.jsx";
import RoomList from "./screens/hotelScreens/RoomList.jsx";
import HotelPrivateRoute from "./components/HotelPrivateRoute/HotelPrivateRoute.jsx";
import AdminLogin from "./screens/adminScreens/AdminLogin.jsx";
import HotelListForAdmin from "./screens/adminScreens/HotelListForAdmin.jsx";
import HotelDetailsScreen from "./screens/hotelScreens/HotelDetailsScreen.jsx";
import HotelListScreen from "./screens/hotelScreens/HotelListScreen.jsx";
import { UserProfileScreen } from "./screens/userScreens/UserProfileScreen.jsx";
import FacilitiesManagementScreen from "./screens/adminScreens/FacilitiesManagementScreen.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute/AdminPrivateRoute.jsx";
import UserPrivateRoute from "./components/UserPrivateRoute/UserPrivateRoute.jsx";
import ErrorPage from "./components/ErrorComponent/ErrorComponent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HotelList />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/hotel-single/:id",
    element: <HotelSinglePage />,
  },
  {
    path: "/profile",
    element: <UserPrivateRoute><UserProfileScreen/></UserPrivateRoute>,
    errorElement:<ErrorPage/>
  },
  {
    path: "/Hotel/Register",
    element: <RegisterHotelier />,
  },
  {
    path: "/Hotel/Login",
    element: <LoginHotel />,
  },
  {
    path: "/Hotel/Rooms/:id",
    element: <HotelPrivateRoute><RoomList/></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Hotel/AddDetails",
    element: <HotelPrivateRoute><AddHotelDetailsScreen /></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Hotel/Details/:id",
    element: <HotelPrivateRoute><HotelDetailsScreen /></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Hotel/HotelList",
    element: <HotelPrivateRoute><HotelListScreen /></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  },


  {
    path: "/Admin/Login",
    element: <AdminLogin />,
  },
  {
    path: "/Admin/Hotels",
    element: <AdminPrivateRoute><HotelListForAdmin/></AdminPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Admin/Facilities",
    element: <AdminPrivateRoute><FacilitiesManagementScreen/></AdminPrivateRoute>,
    errorElement:<ErrorPage/>

  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;