import React from "react";
import "../App.css";
import {useAuth0} from "@auth0/auth0-react"

function Display({customerVideo, responseVideo, notes,answered}) {
    const {user} = useAuth0();
    let manager = false

    let cNotes =notes.substring(

    )
    if (user.email === "korbinmeink@gmail.com" || user.email ==="akcalebh@gmail.com"){
        manager = true
    }
    return (
        <div>
                    <td>
                        <iframe width="420" height ="315" src={customerVideo}>Customer's Question</iframe>
                    </td>
                    <td>
                        {answered ?
                        <iframe width="420" height ="315" src={responseVideo}>Customer's Question</iframe> :
                            <p>There has not been a response yet!</p>}

                    </td>
</div>
    );
}

export default Display;