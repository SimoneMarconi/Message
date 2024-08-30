import React from "react";

import "../styles/MessageOverlay.css"
import MessageForm from "./MessageForm";

function MessageOverlay(props){
    const show = props.show
    const onClose = props.onClose
    const port = props.port

    return(
    <>
            {
                show ? (
                    <div className="mess-overlay">
                        <div className="mess-overlay-controls">
                            localhost:{port}
                            <button className="mess-overlay-close" type="button" onClick={onClose}>✖</button>
                        </div>
                        <div>
                            <MessageForm port={port} close={onClose}/>
                        </div>
                    </div>
                ) : null
            }
    </>
    )
}

export default MessageOverlay
