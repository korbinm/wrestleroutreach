import React from "react";
import {useNavigate} from "react-router-dom";
import {useRef, useEffect, useState} from 'react';
import {userLogin} from "../api"
import App from '../index.js'
import {createCustomer} from "../api";
import Layout from "./Layout";
import Home from "./home";
//probably need some sort of function like {getCustomer} or something like that

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    //hook for getting back to homepage after success
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    // Supposed to set focus on first box
    // useEffect(() => {
    //     userRef.current.focus;
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            userLogin(user, pwd).then(res => {

                console.log(res);
            });
        } catch{
            alert("Error logging in");
        }
        navigate("/"); //Routes back to Homepage
    }
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }
    // //validate user registration information
    // const validate = () => {
    //     if (!inputs.email) {
    //         inputs.errors = "Please enter an email.";
    //         return false;
    //     }
    //     if (!inputs.password) {
    //         inputs.errors = "Please enter a password.";
    //         return false;
    //     }
    //     return true;
    // }


    return (
        <>
            {success ? (
                //Put what to do on a success here
                <h1>hi</h1>
            ) : (
                <form id="login" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </div>
                </form>
            )}
        </>
    )
};
export default Login;