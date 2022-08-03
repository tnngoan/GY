import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CreateTodo } from "./components/createTodo";
import UpdateTodo from './components/updateTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import splitByComma from './utility/splitByComma';

function App() {
	const [todolist, setTodolist] = useState([])
	const [update, setUpdate] = useState(false)
	const [id, setId] = useState("");
	const [open, setOpen] = useState(false);
	const [completed, setCompleted] = useState(false)
	const [editData, setEditData] = useState({ title: '', category: "" })

	useEffect(() => {
		getTodos()
	}, [update]);
	// prevent useEffect from running on every render

	function getTodos() {
		axios.get("http://localhost:8000/api/todo").then((res) => {
			setTodolist(res.data)
		}).catch((err) => {
			console.log(err)
		})
	}

	function handleEdit(e) {
		setEditData(splitByComma(e.target.value))
		setId(e.target.name);
		setOpen(true);
	}

	function handleClose() {
		setId("");
		setOpen(false);
	}

	function handleDelete(e) {
		alert('Deleting ' + e.target.value)
		axios.delete(`http://localhost:8000/api/todo/${e.target.name}`,)
		setTodolist((data) => {
			return data.filter((todo) => todo._id !== e.target.name)
		})
	}

	function handleUpdate() {
		console.log("update:", update);
		setUpdate(!update);
	}

	function handleCheck(e) {
		e.target.checked ? setCompleted(true) : setCompleted(false)
	}

	return (
		<div className='flex w-full min-h-screen gap-4 p-20 xl:px-40 bg-gray-200 flex justify-center items-top'>
			<div className="shadow-xl w-full bg-pink-100 rounded block">
				<section>
					<code className='p-3 text-xl bg-blue-400 rounded'>Todolist</code>
					<ul className='my-4 mx-4 overflow-y-scroll'>
						{todolist.map((data, i) => (
							<li key={i} className={`p-2 my-3 border border-1 border-pink-200 bg-pink-200 text-gray-700 rounded shadow-md`}>
								<div className='flex justify-between items-baseline'>
									<input value={completed} type="checkbox" className='outline-none' onChange={handleCheck} />
									<div className='text-left'>
										<h3 className={`h-12  ${completed ? 'line-through' : 'none'}`}>{data.title}</h3>
										<code className='p-1 pr-2 text-xs rounded-md bg-blue-300 shadow-lg'><FontAwesomeIcon icon={faTag} className='px-2' />{data.category}</code>
									</div>
									<div className='flex flex-col w-20 p-2 m-2 gap-2'>
										<button name={data._id} value={[data.title, data.category]} className="p-2 shadow-xl bg-pink-500 rounded w-full" onClick={handleEdit}>
											Edit
										</button>
										<button name={data._id} value={data.title} className="p-2 shadow-xl bg-pink-500 rounded" onClick={handleDelete}>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</section>
				{open ? (
					<div className="shadow-lg">
						<p onClick={handleClose} className="close">
							&times;
						</p>
						<UpdateTodo
							_id={id}
							editData={editData}
							handleClose={handleClose}
							handleUpdate={handleUpdate}
						/>
					</div>
				) : ("")}
			</div>
			<div className="shadow-xl w-full bg-pink-700 rounded">
				<CreateTodo handleUpdate={handleUpdate} />
			</div>
		</div>
	);
}

export default App;
