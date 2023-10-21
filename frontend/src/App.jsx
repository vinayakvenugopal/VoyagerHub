import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterScreen from './screens/userScreens/RegisterScreen.jsx'
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
function App() {
  return ( 
    <div>
      <BrowserRouter>      
      <Routes>  
      {/* ...................USER SCREENS START................................ */}

      <Route path="/register" element={<RegisterScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/" element={<HotelList/>}/>
      <Route path="/hotel-single/:id" element={<HotelSinglePage/>}/>
      <Route path="/profile" element={<UserProfileScreen/>}/>   


      {/* ...................USER SCREENS END................................ */}

      {/* ...................HOTELIER SCREENS START................................ */}

      <Route path="/Hotel/Register" element={<RegisterHotelier/>}/>
      <Route path="/Hotel/Login" element={<LoginHotel/>}/>
      <Route path="/Hotel/Rooms/:id" element={<RoomList/>}/>   
      <Route path="/Hotel/AddDetails" element= {<HotelPrivateRoute> <AddHotelDetailsScreen /> </HotelPrivateRoute> }/>                                 
      <Route path="/Hotel/Details/:id" element= {<HotelPrivateRoute> <HotelDetailsScreen /> </HotelPrivateRoute> }/>                                 
      <Route path="/Hotel/HotelList" element= {<HotelPrivateRoute> <HotelListScreen /> </HotelPrivateRoute> }/>                                 

                                                   
      {/* ...................HOTELIER SCREENS END................................ */}

      {/* ...................ADMIN SCREENS START................................ */}
      <Route path="/Admin/Login" element={<AdminLogin/>}/>
      <Route path="/Admin/Hotels" element={<HotelListForAdmin/>}/>

      {/* ...................ADMIN SCREENS END................................ */}


      

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
