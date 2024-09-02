import React from "react";

import "../styles/Navbar.css"
import axios from "axios";

function Navbar(props){

    const setList = props.setList
    const setStatus = props.getStatus

    function quit(){
        axios.get("http://localhost:4200/quit")
            .then((res) => {
            if (res.data.status === "success"){
                    setList([])
                    setStatus([])
                }else{
                    console.log("error closing all ports")
                }
        })
    }

    return(
        <div className="navbar">
            <button className="nav-button">Home</button>
            <button className="nav-off" onClick={quit}>✖</button>
        </div>
    )
}

export default Navbar;
