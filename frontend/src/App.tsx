import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterScreen from './screens/userScreens/RegisterScreen.tsx'
import LoginScreen from "./screens/userScreens/LoginScreen.tsx";
import HomeScreen from "./screens/userScreens/HomeScreen.tsx";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/Register" element={<RegisterScreen/>}/>
      <Route path="/Login" element={<LoginScreen/>}/>
      <Route path="/" element={<HomeScreen/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
