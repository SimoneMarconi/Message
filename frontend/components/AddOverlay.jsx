import React from "react";
import AddForm from "./AddForm";

function AddOverlay(props){

    const onClose = props.onClose
    const setNewPort = props.setNewPort
    const getStatus = props.getStatus
    const list = props.list
    const setList = props.setList
    console.log("list from Overlay:", list)

    return(
        <>
            <div className="overlay">
                <div className="overlay-controls">
                    Open port
                    <button className="overlay-close" type="button" onClick={onClose}>✖</button>
                </div>
                <div>
                    <AddForm onClose={onClose} setNewPort={setNewPort} getStatus={getStatus} list={list} setList={setList}/>
                </div>
            </div>
        </>
    )
}

export default AddOverlay
