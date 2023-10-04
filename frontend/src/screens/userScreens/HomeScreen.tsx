import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/userAuthSlice";
function HomeScreen():JSX.Element {
  const { userInfo } = useSelector( (state:any) => state.auth.auth );
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async() =>{
    console.log('logout');
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout({}));
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
    hello
    {userInfo?.name}
    <br /><br />
    <button
    onClick={logoutHandler}
    color="red"
    >Logoout</button>

    </>
  )
}

export default HomeScreen
