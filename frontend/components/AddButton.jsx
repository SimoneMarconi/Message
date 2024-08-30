import React, { useState } from 'react';

import "../styles/AddButton.css"
import axios from 'axios';
import AddOverlay from './AddOverlay';


function AddButton(props) {

    const status = props.status
    const setStatus = props.setStatus
    const list = props.list
    const setList = props.setList
    const [add, setAdd] = useState(false)
    const [newPort, setNewPort] = useState(0)
    console.log("current newPort", newPort)

    function getStatus(port){
        console.log("port sending:", port)
        axios.post("http://localhost:4200/status", {
            "port" : port,
        }).then((res) => {
                console.log("status: ", res)
                let stat = res.data.status
                if (stat === "success"){
                    console.log("props.list: ", props.list)
                    setStatus(status.concat(port))
                    console.log("status", status)
                }else{
                    setTimeout(function(){
                        getStatus(parseInt(port))
                    }, 1000);
                }
            })
    }

    function handleClick(){
        onClose()
    }

    function onClose(){
        setAdd(!add)
    }

    return (
        add ? (
            <AddOverlay onClose={onClose} setNewPort={setNewPort} getStatus={getStatus} list={list} setList={setList}/>
        ) : (
            <div>
                <button className="add-button" onClick={handleClick}>+</button>
            </div>
        )

    );
}

export default AddButton;
