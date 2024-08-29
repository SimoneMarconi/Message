import React from 'react';

import "../styles/AddButton.css"
import axios from 'axios';

const dummy = {
    "port":2001,
    "payload": "Init\n"
}

function AddButton(props) {

    const port = 2001
    const newList = props.list.concat(port)

    function getStatus(){
        axios.post("http://localhost:4200/status", {
            "port" : port,
        }).then((res) => {
                console.log("status: ", res)
                let stat = res.data.status
                if (stat === "success"){
                    console.log("props.list: ", props.list)
                    props.status(newList)
                }else{
                    setTimeout(getStatus, 1000);
                    
                }
            })
    }

    function handleClick(){
        console.log("setting new list")
        props.setList(newList)
        axios.post("http://localhost:4200/message", dummy).then((res) => {
                console.log("message: ", res)
                setTimeout(getStatus, 1000)
            })
    }
  return (
    <div>
      <button className="add-button" onClick={handleClick}>+</button>
    </div>
  );
}

export default AddButton;
