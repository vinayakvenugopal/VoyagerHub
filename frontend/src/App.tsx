import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterScreen from './screens/userScreens/RegisterScreen.tsx'
import LoginScreen from "./screens/userScreens/LoginScreen.tsx";
import HotelList from "./screens/userScreens/HotelList.tsx";
import RegisterHotelier from "./screens/hotelScreens/RegisterHotelier.tsx";
import HotelDetailsScreen from "./screens/hotelScreens/HotelDetailsScreen.tsx";
import LoginHotel from "./screens/hotelScreens/LoginHotel.tsx";
import HotelSinglePage from "./screens/userScreens/HotelSinglePage.tsx";


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

      {/* ...................HOTELIER SCREENS END................................ */}


      

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
