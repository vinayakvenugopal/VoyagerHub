import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterScreen from './screens/userScreens/RegisterScreen.tsx'
import LoginScreen from "./screens/userScreens/LoginScreen.tsx";
import HomeScreen from "./screens/userScreens/HomeScreen.tsx";
import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.tsx";
import HotelDetailsScreen from "./screens/hotelScreens/HotelDetailsScreen.tsx";
import LoginHotel from "./screens/hotelScreens/LoginHotel.tsx";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      {/* ...................USER SCREENS START................................ */}

      <Route path="/Register" element={<RegisterScreen/>}/>
      <Route path="/Login" element={<LoginScreen/>}/>
      <Route path="/" element={<HomeScreen/>}/>

      {/* ...................USER SCREENS END................................ */}

      {/* ...................HOTELIER SCREENS START................................ */}

      <Route path="/Hotel/Register" element={<RegisterHotelier/>}/>
      <Route path="/Hotel/Login" element={<LoginHotel/>}/>
      <Route path="/Hotel/Details" element={<HotelDetailsScreen/>}/>

      {/* ...................HOTELIER SCREENS END................................ */}


      

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
