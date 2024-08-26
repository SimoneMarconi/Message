import React from "react";

import "../styles/Card.css"

function Card(props){
    return(
        <div className="card">
            <div className="card-header">
                localhost:{props.port}
                <button className="card-close">✖</button>
            </div>
            <div>
                <span className="card-status">status:</span> <span className="card-done">Done</span>
            </div>
            <button className="card-message">Message</button>
        </div>
    );
}

export default Card