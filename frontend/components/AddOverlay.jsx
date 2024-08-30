import React from "react";
import AddForm from "./AddForm";

import "../styles/AddOverlay.css"

function AddOverlay(props){

    const onClose = props.onClose
    const setNewPort = props.setNewPort
    const getStatus = props.getStatus
    const list = props.list
    const setList = props.setList
    console.log("list from Overlay:", list)

    return(
        <>
            <div className="add-overlay">
                <div className="add-overlay-controls">
                    Open port
                    <button className="add-overlay-close" type="button" onClick={onClose}>✖</button>
                </div>
                <div>
                    <AddForm onClose={onClose} setNewPort={setNewPort} getStatus={getStatus} list={list} setList={setList}/>
                </div>
            </div>
        </>
    )
}

export default AddOverlay
