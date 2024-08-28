import React from 'react';

import "../styles/AddButton.css"
import axios from 'axios';

const dummy = {
    "port":2001,
    "payload": "Init\n"
}

function AddButton(props) {
    function handleClick(){
        props.list([2001])
        axios.post("http://localhost:4200/message", dummy).then((res) => {
                console.log("message: ", res)
            })
        axios.post("http://localhost:4200/status", {
            "port" : 2001,
        }).then((res) => {
                console.log("status: ", res)
                props.status([2001])
            })
    }
  return (
    <div>
      <button className="add-button" onClick={handleClick}>+</button>
    </div>
  );
}

export default AddButton;
