import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterScreen from './screens/userScreens/RegisterScreen.jsx'
import LoginScreen from "./screens/userScreens/LoginScreen.jsx";
import HotelList from "./screens/userScreens/HotelList.jsx";
import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.jsx";
import HotelDetailsScreen from "./screens/hotelScreens/AddHotelDetailsScreen.jsx";
import LoginHotel from "./screens/hotelScreens/LoginHotel.jsx";
import HotelSinglePage from "./screens/userScreens/HotelSinglePage.jsx";
import RoomList from "./screens/hotelScreens/RoomList.jsx";
import HotelPrivateRoute from "./components/HotelPrivateRoute/HotelPrivateRoute.jsx";

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


      {/* ...................USER SCREENS END................................ */}

      {/* ...................HOTELIER SCREENS START................................ */}

      <Route path="/Hotel/Register" element={<RegisterHotelier/>}/>
      <Route path="/Hotel/Login" element={<LoginHotel/>}/>
      {/* <Route path="/Hotel/Details" element={<HotelDetailsScreen/>}/> */}
      <Route path="/Hotel/Rooms" element={<RoomList/>}/>   
      <Route path="/Hotel/Details" element= {<HotelPrivateRoute> <HotelDetailsScreen /> </HotelPrivateRoute> }/>                                 
                                    

      {/* ...................HOTELIER SCREENS END................................ */}


      

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
