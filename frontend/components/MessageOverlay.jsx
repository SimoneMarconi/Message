import React from "react";

import "../styles/Overlay.css"
import MessageForm from "./MessageForm";

function MessageOverlay(props){
    const show = props.show
    const onClose = props.onClose
    const port = props.port

    return(
    <>
            {
                show ? (
                    <div className="overlay">
                        <div className="overlay-controls">
                            localhost:{port}
                            <button className="overlay-close" type="button" onClick={onClose}>✖</button>
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
