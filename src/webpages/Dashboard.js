import React, {useEffect} from "react";
import '../App.css';
import { useAuth0 } from '@auth0/auth0-react'

function Dashboard() {
    const { user, getAccessTokenSilently, isAuthenticated, error } = useAuth0()
    const token =  getAccessTokenSilently();



    useEffect(()=>{

        if (error) {
        console.log(error)
    } else if (isAuthenticated) {
            console.log("user: ", user)
            console.log("Token: ", token)
            console.log("Name:", user.name)

    }
    })
    return <h1>HI</h1>

}
export default Dashboard;