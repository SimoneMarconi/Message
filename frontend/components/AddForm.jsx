import axios from "axios";
import React, { useState } from "react";

import "../styles/AddForm.css"

function AddForm(props){


    const setNewPort= props.setNewPort
    const getStatus = props.getStatus
    const list = props.list
    const setList = props.setList
    const onClose = props.onClose

    const [formData, setFormData] = useState({})

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    //can add error handling here
    const handleSubmit = (event) => {
        event.preventDefault()
        const port = parseInt(formData.port)

        if (list.includes(port)){
            console.log("Port already openned")
            return
        }

        console.log("formData: ", formData)
        if (Number.isNaN(port)){
            console.log("Port value given is not a number")
            return
        }
        if (port <= 1024 || port >= 65535){
            console.log("Port value not valid")
            return
        }
        const body = {
            "port" : port,
            "payload": "Init\n",
        }
        console.log(body)
        
        if (list.includes(port)){
            onClose()
        }

        axios
            .post("http://localhost:4200/message", body)
            .then(() => {
                console.log("submitted")
                console.log(formData)
                setNewPort(port)
                setList(list.concat(port))
                console.log("list:", list)
                setTimeout(function(){
                    getStatus(parseInt(port))
                }, 1000)
            })

        onClose()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label className="add-label">
                Port Number
                <input className="add-input" type="text" name="port" onChange={handleChange} required/>
            </label>
        </form>
    )
}

export default AddForm
