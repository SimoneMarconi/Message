import axios from "axios";
import React, { useState } from "react";

import "../styles/MessageForm.css"

function MessageForm(props) {
    const port = props.port
    const initialFormState = {
        port:port,
        payload:''
    }

    const [formData, setFormData] = useState(initialFormState)

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        console.log(formData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        formData.payload += "\n" 
        console.log(formData.payload)

        axios
            .post("http://localhost:4200/message", formData)
            .then(console.log("message: ", formData.payload))
        setFormData(initialFormState)
        props.close()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label className="message-label">
                Message
                <input className="message-input" type="text" name="payload" onChange={handleChange} required />
            </label>
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageForm
