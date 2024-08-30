import axios from "axios";
import React, { useState } from "react";

function AddForm(props){

    console.log("loading AddForm")

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

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("formData: ", formData)
        const body = {
            "port" : parseInt(formData.port),
            "payload": "Init\n",
        }
        console.log(body)
        const port = parseInt(formData.port)
        
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
            <label>
                Port: 
                <input type="text" name="port" onChange={handleChange} required/>
            </label>
        </form>
    )
}

export default AddForm
