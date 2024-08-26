import React from "react";

import "../styles/Navbar.css"

function Navbar(){
    return(
        <div className="navbar">
            <button className="nav-button">Home</button>
            <button className="nav-button">Info</button>
            <button className="nav-off">✖</button>
        </div>
    )
}

export default Navbar;