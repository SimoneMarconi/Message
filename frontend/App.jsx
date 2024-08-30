import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";
import Card from "./components/Card";

import "./styles/App.css"
import axios from "axios";

function App() {
    const [portList, setList] = useState([])
    const [status, setStatus] = useState([])

    useEffect(()=>{
        axios
            .get("http://localhost:4200/port")
            .then((res) => {
                setList(res.data.ports)
                console.log(res)
            })
    }, [])

	const list = portList.map((ele, index) => 
		<ul key={index}><Card port={ele} list={portList} setList={setList} status={status} setStatus={setStatus}/></ul>
	)
	return (
		<div className="app-container">
			<Navbar />
			<div className="app-main">
				{list}
			</div>
			<AddButton list={portList} setList={setList} status={status} setStatus={setStatus}/>
		</div>
	);
}

export default App
