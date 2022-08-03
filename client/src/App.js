import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CreateTodo } from "./components/createTodo";
import UpdateTodo from './components/updateTodo';

function App() {
	const [todolist, setTodolist] = useState([])
	const [update, setUpdate] = useState(false)
	const [id, setId] = useState("");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getTodos()
	}, [update]);
	// prevent useEffect from running on every render

	function getTodos() {
		axios.get("http://localhost:8000/api/todo").then((res) => {
			setTodolist(res.data)
			console.log(res.data)
		}).catch((err) => {
			console.log(err)
		})
	}

	function handleEdit(e) {
		setId(e.target.name);
		setOpen(true);
	}

	function handleClose() {
		setId("");
		setOpen(false);
	}

	function handleDelete(e) {
		axios.delete(`http://localhost:8000/api/todo/${e.target.name}`,)
		setTodolist((data) => {
			return data.filter((todo) => todo._id !== e.target.name)
		})
	}

	function handleUpdate() {
		console.log("update:", update);
		setUpdate(!update);
	}

	return (
		<div className='flex w-full border border-1 min-h-screen px-40'>
			<div className="border border-2 w-full m-2">
				<section>
					<h1>LIST</h1>
					<ul>
						{todolist.map((data, i) => (
							<li key={i}>
								<div className='flex justify-between'>
									<input type="checkbox" className='' onChange={handleUpdate} />
									<div>
										<h3>{data.title}</h3>
										<p>{data.category}</p>
									</div>
									<div>
										<button name={data._id} className="p-2 m-2 border" onClick={handleEdit}>
											Edit
										</button>
										<button name={data._id} className="p-2 border" onClick={handleDelete}>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</section>
				{open ? (
					<div className="border border-1">
						<p onClick={handleClose} className="close">
							&times;
						</p>
						<UpdateTodo
							_id={id}
							handleClose={handleClose}
							handleUpdate={handleUpdate}
						/>
					</div>
				) : ("")}
			</div>
			<div className="border border-2 w-full m-2">
				<CreateTodo handleUpdate={handleUpdate}  />
			</div>
		</div>
	);
}

export default App;
