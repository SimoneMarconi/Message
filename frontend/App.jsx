import React from "react";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";
import Card from "./components/Card";

import "./styles/App.css"

const data = {
	"data": [
		{
			"port": 2001,
		},
		{
			"port": 2002,
		},
		{
			"port": 2003,
		}
	],
}

function App() {

	const list = data.data.map((ele, index) => 
		<ul key={index}><Card port={ele.port} /></ul>
	)

	return (
		<div className="app-container">
			<Navbar />
			<div className="app-main">
				{list}
			</div>
			<AddButton />
		</div>
	);
}

export default App