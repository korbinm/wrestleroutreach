import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import {createCustomer} from "../api";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import App from "../index";
import Layout from "../webpages/Layout.js";
import Home from "./home";


//Form for registering
const Register = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        confirm_pass: "",
        errors: ""
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    //validate user registration information
    const validate = () => {
        if (!inputs.name) {
            inputs.errors = "Please enter a name.";
            return false;
        }
        if (!inputs.email) {
            inputs.errors = "Please enter an email.";
            return false;
        }
        if (!inputs.password) {
            inputs.errors = "Please enter a password.";
            return false;
        }
        //insert valid password requirement check
        if (!inputs.confirm_pass) {
            inputs.errors = "Please enter a confirmation password";
            return false;
        }
        if (inputs.password !== inputs.confirm_pass) {
            inputs.errors = "Passwords do not match!"
            return false;
        }
        return true;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) {
            alert(inputs.errors);
        } else {
            createCustomer(inputs).then(res => {
                console.log("User Created");
            })
        }
    }

    return (
        <form id="register" onSubmit={handleSubmit}>
            <div>
                <label>Full Name</label>
            </div>
            <div>
                <input
                    type="text"
                    name="name"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email</label>
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password</label>
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />

            </div>
            <div>
                <label>Confirm Password</label>
            </div>
            <div>
                <input
                    type="password"
                    name="confirm_pass"
                    value={inputs.confirm_pass || ""}
                    onChange={handleChange}
                />

                <div>
                    <input
                        type="submit"
                        value="Submit"
                    />
                </div>
            </div>
        </form>
    )
}

export default Register;