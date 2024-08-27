import React from 'react';

import "../styles/AddButton.css"
import axios from 'axios';

function AddButton(props) {
    function handleClick(){
        props.list([2001])
        axios.post("http://localhost:4200/message", {
            "port":2001,
            "payload": "Hello World\n"
        }).then((res) => {
                console.log(res)
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
