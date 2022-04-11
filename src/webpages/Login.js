import React from 'react';
import {useState } from 'react';
import ReactDOM from 'react-dom';
import {createCustomer} from "../api"; //probably need some sort of function like {getCustomer} or something like that

function LoginForm() {
    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        errors:""
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }
    //validate user registration information
    const validate = () =>{
        if(!inputs.email){
            inputs.errors = "Please enter an email.";
            return false;
        }
        if(!inputs.password){
            inputs.errors = "Please enter a password.";
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
                console.log('user logon');
            })
        }

    }

    return(
<form id="Login">
	<center>
	<div>
            <label>Email</label>
	</div>
	<div>
                <input
                    type = "email"
                    name = "email"
                    value = {inputs.email || ""}
                    onChange={handleChange}
                />
	</div>
	<div>
            <label>Password</label>
	</div>
	<div>
                <input
                    type = "password"
                    name = "password"
                    value = {inputs.password || ""}
                    onChange={handleChange}
                />

	</div>
	</center>
</form>
    )
}
const Login = () => {
    return LoginForm();
}
export default Login;