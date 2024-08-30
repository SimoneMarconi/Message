import React, { useState } from "react";

import "../styles/Card.css"
import MessageOverlay from "./MessageOverlay";
import axios from "axios";

function Card(props){

    const [msg, setMsg] = useState(false)

    const list = props.list
    const setList = props.setList
    const setStatus = props.setStatus
    const port = props.port
    let status = props.status.includes(port) ? "Done" : "Pending"

    function closeCard(){
        axios.post("http://localhost:4200/port", {
            "port": parseInt(port)
        }).then((res) => {
                if (res.status != 200){
                    console.log("Error closing port", port)
                    return
                }
                let newList = list.filter((item) => {
                    return item != parseInt(port)
                })
                let newStatus = props.status.filter((item) => {
                    return item != parseInt(port)
                })
                setList(newList)
                setStatus(newStatus)
            })
    }

    const toggleMsg = ()=>setMsg(!msg)
    
    return(
        msg ? (
        <MessageOverlay show={msg} onClose={toggleMsg} port={port}/>
        ) : (
                <div className="card">
                    <div className="card-header">
                        localhost:{port}
                        <button className="card-close" onClick={closeCard}>✖</button>
                    </div>
                    <div>
                        <span className="card-status">status:</span> <span className="card-done">{status}</span>
                    </div>
                    <button className="card-message" onClick={toggleMsg}>Message</button>
                </div>
        )
    );
}

export default Card
