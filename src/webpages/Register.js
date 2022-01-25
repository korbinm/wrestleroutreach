import React from 'react';
import {useState } from 'react';
import ReactDOM from 'react-dom';
import {createCustomer} from "../config/db";

//Form for registering
function RegisterForm(){
    const [inputs, setInputs] = useState({
        name: "",
        email:"",
        password:"",
        confirm_pass: "",
        errors:""
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }
    //validate user registration information
    const validate = () =>{
        if(!inputs.name){
            inputs.errors = "Please enter a name.";
            return false;
        }
        if(!inputs.email){
            inputs.errors = "Please enter an email.";
            return false;
        }
        if(!inputs.password){
            inputs.errors = "Please enter a password.";
            return false;
        }
        //insert valid password requirement check
        if(!inputs.confirm_pass){
            inputs.errors = "Please enter a confirmation password";
            return false;
        }
        if(inputs.password !== inputs.confirm_pass){
            inputs.errors = "Passwords do not match!"
            return false;
        }
        return true;
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!validate()){
            alert(inputs.errors);
        }
        else{
            createCustomer(inputs).then(res =>{
                console.log('user added');
            })
        }

    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input
                    type = "text"
                    name = "name"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Enter Email:
                <input
                    type = "email"
                    name = "email"
                    value = {inputs.email || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Password:
                <input
                    type = "password"
                    name = "password"
                    value = {inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Confirm Password:
                <input
                    type="password"
                    name = "confirm_pass"
                    value = {inputs.confirm_pass || ""}
                    onChange={handleChange}
                />
            </label>
            <input type = "submit"/>
        </form>
    )
}
const Register = () => {
    return RegisterForm();
}
export default Register;