import React, { useState } from "react";
import { useRegisterMutation,useGoogleLoginMutation } from "../../slices/userApiSlice";
import { useSelector,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/userAuthSlice";
import {toast} from 'react-toastify'
import { RootState } from "../../store";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function RegisterScreen(): JSX.Element {

  const { userInfo } = useSelector( (state:RootState) => state.auth);
  const [register] = useRegisterMutation()
  const [googleLogin] = useGoogleLoginMutation()


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")

  async function submitHandler(e:React.FormEvent){
    e.preventDefault();
    try {
      const responseFromApiCall = await register( { name,email, password } ).unwrap();
      dispatch(setCredentials( { ...responseFromApiCall } ) );
      navigate('/');

      } catch (err:any) {
        toast.error( err?.data?.message || err?.error );
      }
  }
  const handleSuccess = async(credentialResponse: any) => {    
    // Assuming credentialResponse.accessToken contains your JWT token
    const decoded: any = jwt_decode(credentialResponse.credential);
    console.log(decoded);
    const googleName = decoded.name
    const googleEmail = decoded.email

    const responseFromApiCall = await googleLogin(  { googleName,googleEmail} ).unwrap();
    dispatch(setCredentials( { ...responseFromApiCall } ) );
    navigate('/');

  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <br />
          <GoogleOAuthProvider clientId="579662997574-s08dt3piebftu4qfo8t0iccbu2ei21tq.apps.googleusercontent.com">
          <GoogleLogin
  onSuccess={handleSuccess}
  onError={() => {
    console.log('Login Failed');
  }}
/>
            </GoogleOAuthProvider>

          
          {/* <div className="px-6 sm:px-0 max-w-sm">
    <button type="button" onClick={googleLoginHandler} className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
</div> */}

        </div>
      </div>
    </>
  );
}

export default RegisterScreen;
