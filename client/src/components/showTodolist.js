import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TodoCard from './TodoCard'
import UpdateTodo from './updateTodo'
// import { Link } from "react-router-dom";

export const ShowTodolist = () => {
	const [todo, setTodo] = useState([])
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState(false)
	const [id, setId] = useState("");

	useEffect(() => {
		getTodos()
	}, [update]);
	// prevent useEffect from running on every render

	function getTodos() {
		axios.get("http://localhost:8000/api/todo").then((res) => {
			console.log(res.data);
			setTodo(res.data)
		}).catch((err) => {
			console.log(err)
		})
	}

	function handleEdit(e) {
		setId(e.target.name);
		setOpen(true);
	}

	function handleDelete(e) {
		axios.delete(`http://localhost:8000/api/todo/${e.target.name}`,)
		setTodo((data) => {
			return data.filter((todo) => todo._id !== e.target.name)
		})
	}

	function handleUpdate() {
		console.log("update:", update);
		setUpdate(!update);
	}

	function handleClose() {
		setId("");
		setOpen(false);
	}

	return (
		<section>
			<div>
				<h1>TODOLIST</h1>
				<ul>
					{todo.map((data) => (
						<TodoCard data={data} key={data.id} handleEdit={handleEdit} handleDelete={handleDelete} handleUpdate={handleUpdate} func={[handleEdit, handleDelete, handleUpdate]} />
					))}
				</ul>
			</div>
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
		</section>
	)
}

export default ShowTodolist