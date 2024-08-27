import React, { useState } from "react";

import "../styles/Card.css"
import MessageOverlay from "./MessageOverlay";

function Card(props){

    const [msg, setMsg] = useState(false)

    const port = props.port
    let status = props.status.includes(port) ? "Done" : "Pending"

    const toggleMsg = ()=>setMsg(!msg)
    
    return(
        msg ? (
        <MessageOverlay show={msg} onClose={toggleMsg} port={port}/>
        ) : (
                <div className="card">
                    <div className="card-header">
                        localhost:{port}
                        <button className="card-close">✖</button>
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
