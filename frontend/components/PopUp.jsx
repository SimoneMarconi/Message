import React from "react";
import axios from "axios";

import "../styles/PopUp.css"

function PopUp(props){

    const show = props.show
    const setShow = props.setShow
    const port = props.port
    const setPort = props.setPort
    const list = props.list
    const setList = props.setList
    const status = props.status
    const setStatus = props.setStatus

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
                let newStatus = status.filter((item) => {
                    return item != parseInt(port)
                })
                setList(newList)
                setStatus(newStatus)
                setPort(0)
                closePopUp()
            })
    }

    function closePopUp(){
        setShow(!show)
    }

    return (
        <>
            {
                show ? (
                    <div className="popup-background">
                        <div className="popup-container">
                            <div className="popup-header">
                                Warning
                            </div>
                            <div className="popup-body">
                                Do you want to close the port {port}
                            <div className="popup-buttons">
                                    <button className="popup-yes" onClick={closeCard}>Yes</button>
                                    <button className="popup-cancel" onClick={closePopUp}>Cancel</button>
                            </div>
                            </div>
                        </div>
                    </div>

                ) : null
            }
        </>
    )
}

export default PopUp
