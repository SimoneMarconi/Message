import React, { useState } from "react";

import "../styles/Card.css"
import MessageOverlay from "./MessageOverlay";
//import axios from "axios";

function Card(props){

    const [msg, setMsg] = useState(false)

    //const list = props.list
    //const setList = props.setList
    //const setStatus = props.setStatus
    const port = props.port
    const setPopup = props.setPopup
    const setPortClose = props.setPortClose
    const status = props.status
    console.log(status)

    function openPopup(){
        setPopup(true)
        setPortClose(port)
    }

    const toggleMsg = ()=>setMsg(!msg)
    
    return(
        msg ? (
        <MessageOverlay show={msg} onClose={toggleMsg} port={port}/>
        ) : (
                <div className="card">
                    <div className="card-header">
                        localhost:{port}
                        <button className="card-close" onClick={openPopup}>✖</button>
                    </div>
                    <div>
                        <span className="card-status">status:</span> <span className="card-done">{status.includes(port) ? "Done": "Pending"}</span>
                    </div>
                    <button className="card-message" onClick={toggleMsg}>Message</button>
                </div>
        )
    );
}

export default Card
