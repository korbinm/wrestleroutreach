import React from "react";
import "../App.css";
import {useAuth0} from "@auth0/auth0-react"
import {useNavigate} from "react-router-dom"
import Player from "./Player";
import App from "./Upload";

function Display({id,customerVideo, responseVideo, notes,answered}) {
    const {user} = useAuth0();

    const navigate = useNavigate();
    console.log ("ID:", id)
    let manager = false
    if (user.email === "korbinmeink@gmail.com" || user.email ==="akcalebh@gmail.com"){
        manager = true
    }
    return (
        <div>
                    <td>
                        {Player(customerVideo)}
                        {/*<iframe allowFullScreen={true}  width="420" height ="315" src={customerVideo}>Customer's Question</iframe>*/}
                    </td>
                    <td>
                        {answered ?
                            <iframe width="420" height ="315" src={responseVideo}>Customer's Question</iframe>
                        :
                            <p>There has not been a response yet!</p>}
                        <button onClick={()=> navigate(`/Upload`,{state:
                                {
                                    id: id,
                                    customerVideo: customerVideo,
                                    responseVideo: responseVideo,
                                    notes: notes
                                }

                        })}>Test </button>
                    </td>
        </div>
    );
}

export default Display;