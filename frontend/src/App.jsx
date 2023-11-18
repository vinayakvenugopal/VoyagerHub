import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import RegisterScreen from "./screens/userScreens/RegisterScreen.jsx";
import LoginScreen from "./screens/userScreens/LoginScreen.jsx";
import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.jsx";
import AddHotelDetailsScreen from "./screens/hotelScreens/AddHotelDetailsScreen.jsx";
import LoginHotel from "./screens/hotelScreens/LoginHotel.jsx";
// import HotelSinglePage from "./screens/userScreens/HotelSinglePage.jsx";
import RoomList from "./screens/hotelScreens/RoomList.jsx";
import HotelPrivateRoute from "./components/HotelPrivateRoute/HotelPrivateRoute.jsx";
import AdminLogin from "./screens/adminScreens/AdminLogin.jsx";
import HotelListForAdmin from "./screens/adminScreens/HotelListForAdmin.jsx";
import HotelDetailsScreen from "./screens/hotelScreens/HotelDetailsScreen.jsx";
// import HotelListScreen from "./screens/hotelScreens/HotelListScreen.jsx";
import { UserProfileScreen } from "./screens/userScreens/UserProfileScreen.jsx";
import FacilitiesManagementScreen from "./screens/adminScreens/FacilitiesManagementScreen.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute/AdminPrivateRoute.jsx";
import UserPrivateRoute from "./components/UserPrivateRoute/UserPrivateRoute.jsx";
import ErrorPage from "./components/ErrorComponent/ErrorComponent.jsx";
import BookingPage from "./screens/userScreens/bookingPage.jsx";
import ReturnPage from "./screens/userScreens/ReturnPage.jsx";
import { UserBookingList } from "./screens/userScreens/UserBookingList.jsx";
import HotelBookingList from "./screens/hotelScreens/HotelBookingList.jsx";
import ComplaintScreen from "./screens/adminScreens/ComplaintScreen.jsx";
import { HomeScreen } from "./screens/userScreens/HomeScreen.jsx";
import { InvoiceUserPage } from "./screens/userScreens/InvoiceUserPage.jsx";
import AdminDashboard from "./screens/adminScreens/AdminDashboard.jsx";
import UserListScreen from "./screens/adminScreens/UserListScreen.jsx";
import UpdateHotelDetailsScreen from "./screens/hotelScreens/UpdateHotelDetailsScreen.jsx";
import { ReviewManagement } from "./screens/adminScreens/ReviewManagement.jsx";

const HotelList  = lazy(()=>import ("./screens/userScreens/HotelList.jsx"));
const HotelSinglePage  = lazy(()=>import ("./screens/userScreens/HotelSinglePage.jsx"));
const HotelListScreen  = lazy(()=>import ("./screens/hotelScreens/HotelListScreen.jsx"));
const HotelDashboard  = lazy(()=>import ("./screens/hotelScreens/HotelDashboard.jsx"));

 
const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeScreen />,
  },
  {
    path: "/Hotels",
    element:<Suspense fallback={<div>Loading...</div>}> <HotelList /> </Suspense>,
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
    element: <Suspense fallback={<div>Loading...</div>}> <HotelSinglePage /> </Suspense>,
  },
  {
    path: "/profile",
    element: <UserPrivateRoute><UserProfileScreen/></UserPrivateRoute>, 
    errorElement:<ErrorPage/>
  },
  {
    path: "/Booking",
    element: <UserPrivateRoute><BookingPage/></UserPrivateRoute>, 
    errorElement:<ErrorPage/>
  },
  {
    path: "/return",
    element: <UserPrivateRoute><ReturnPage/></UserPrivateRoute>, 
    errorElement:<ErrorPage/>
  },
  {
    path: "/invoice",
    element: <UserPrivateRoute><InvoiceUserPage/></UserPrivateRoute>, 
    errorElement:<ErrorPage/>
  },
  {
    path: "/booking-list",
    element: <UserPrivateRoute><UserBookingList/></UserPrivateRoute>, 
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
    path: "/Hotel/UpdateDetails/:id",
    element: <HotelPrivateRoute><UpdateHotelDetailsScreen /></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Hotel/HotelList",
    element: <HotelPrivateRoute><HotelListScreen /></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  }, 
  {
    path: "/Hotel/booking-list/:id",
    element: <HotelPrivateRoute><HotelBookingList/></HotelPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Hotel/Dashboard",
    element:<Suspense fallback={<div>Loading...</div>}><HotelPrivateRoute><HotelDashboard/></HotelPrivateRoute></Suspense>, 
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
  {
    path: "/Admin/Complaints",
    element: <AdminPrivateRoute><ComplaintScreen/></AdminPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Admin/Dashboard",
    element: <AdminPrivateRoute><AdminDashboard/></AdminPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Admin/Users",
    element: <AdminPrivateRoute><UserListScreen/></AdminPrivateRoute>,
    errorElement:<ErrorPage/>

  },
  {
    path: "/Admin/Reviews",
    element: <AdminPrivateRoute><ReviewManagement/></AdminPrivateRoute>,
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