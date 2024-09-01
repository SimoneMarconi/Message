import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";
import Card from "./components/Card";
import PopUp from "./components/PopUp";

import "./styles/App.css"
import axios from "axios";

function App() {
    const [portList, setList] = useState([])
    const [status, setStatus] = useState([])
    const [popup, setPopup] = useState(false)
    const [portClose, setPortClose] = useState(0)


    useEffect(()=>{
        axios
            .get("http://localhost:4200/port")
            .then((res) => {
                setList(res.data.ports)
                console.log(res)
            })
        axios
            .get("http://localhost:4200/status")
            .then((res) => {
                console.log(res.status)
                setStatus(res.data.ports)
            })
    }, [])

	const list = portList.map((ele, index) =>
        <ul key={index}><Card port={ele} list={portList} setList={setList} status={status} setStatus={setStatus} setPopup={setPopup} setPortClose={setPortClose}/></ul>
	)
	return (
		<div className="app-container">
			<Navbar />
            <PopUp show={popup} setShow={setPopup} port={portClose} setPort={setPortClose} list={portList} setList={setList} status={status} setStatus={setStatus}/>
			<div className="app-main">
				{list}
			</div>
			<AddButton list={portList} setList={setList} status={status} setStatus={setStatus}/>
		</div>
	);
}

export default App
