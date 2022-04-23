import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { userLogin } from "../api";
import LogoutButton from "./Logout";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <LogoutButton />
    </>
  );
};

export default Login;

//probably need some sort of function like {getCustomer} or something like that

// const Login = () => {
//     const userRef = useRef();
//     const errRef = useRef();
//     //hook for getting back to homepage after success
//     const navigate = useNavigate();
//
//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);
//
//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const results = userLogin(user, pwd);
//         console.log(results);
//
//
//
//          //Routes back to Homepage
//     }
//     return (
//         <>
//             {success ? (
//                 //Put what to do on a success here
//                 <h1>hi</h1>
//             ) : (
//                 <form id="login" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email">Email</label>
//                     </div>
//                     <div>
//                         <input
//                             type="email"
//                             id="email"
//                             ref={userRef}
//                             onChange={(e) => setUser(e.target.value)}
//                             value={user}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password">Password</label>
//                     </div>
//                     <div>
//                         <input
//                             type="password"
//                             id="password"
//                             onChange={(e) => setPwd(e.target.value)}
//                             value={pwd}
//                             required
//                         />
//                         <button>Sign In</button>
//                     </div>
//                 </form>
//             )}
//         </>
//     )
// };
