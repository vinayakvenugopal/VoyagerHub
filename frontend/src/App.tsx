import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterScreen from './screens/userScreens/RegisterScreen.tsx'
import LoginScreen from "./screens/userScreens/LoginScreen.tsx";
import HotelList from "./screens/userScreens/HotelList.tsx";
import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.tsx";
import HotelDetailsScreen from "./screens/hotelScreens/AddHotelDetailsScreen.tsx";
import LoginHotel from "./screens/hotelScreens/LoginHotel.tsx";
import HotelSinglePage from "./screens/userScreens/HotelSinglePage.tsx";
import RoomList from "./screens/hotelScreens/RoomList.tsx";

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
      <Route path="/Hotel/Details" element={<HotelDetailsScreen/>}/>
      <Route path="/Hotel/Rooms" element={<RoomList/>}/>                                    
                                    

      {/* ...................HOTELIER SCREENS END................................ */}


      

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
