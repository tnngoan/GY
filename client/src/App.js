import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CreateTodo } from "./components/createTodo";
import UpdateTodo from './components/updateTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import splitByComma from './utility/splitByComma';
import Modal from 'react-modal'

function App() {
	const [todolist, setTodolist] = useState([])
	const [update, setUpdate] = useState(false)
	const [id, setId] = useState("");
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
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

	function handleClick(e) {
		setOpenModal(false)
		console.log(e.target.name)
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
		if (window.confirm("Deleting task ", e.target.name)) {
			axios.delete(`http://localhost:8000/api/todo/${e.target.name}`,)
			setTodolist((data) => {
				return data.filter((todo) => todo._id !== e.target.name)
			})
		}
	}

	function handleUpdate() {
		setUpdate(!update);
	}

	function handleCheck(e) {
		e.target.checked ? setCompleted(true) : setCompleted(false)
		console.log("Task completed set to ", completed)
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
										<h3 className={`h-12  ${completed ? 'line-through' : ''}`}>{data.title}</h3>
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
					<div>
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
				{openModal ? (<Modal isOpen={openModal} style={{
					overlay: {
						position: 'fixed',
						top: 30,
						left: 50,
						right: 50,
						bottom: 30,
						borderRadius: '6px'
					},
					content: {
						position: 'absolute',
						top: '230px',
						left: '300px',
						right: '300px',
						bottom: '230px',
						filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
						background: '#bfdbfe',
						overflow: 'auto',
						WebkitOverflowScrolling: 'touch',
						borderRadius: '6px',
						border: 'none',
						outline: 'none',
						padding: '20px'
					}
				}} >
					<div>Are you sure you want to delete this task?</div>
					<div className="flex justify-around items-center pt-6">
						<button className='py-4 rounded-md bg-gray-100 px-20 shadow-xl' value="false" onClick={(e) => handleClick(e)} >No</button>
						<button className='py-4 rounded-md bg-blue-400 px-20 shadow-xl' value="true" onClick={(e) => handleClick(e)} >Yes</button>
					</div>
				</Modal>) : ("")}
			</div>
			<div className="shadow-xl w-full bg-pink-300 rounded">
				<CreateTodo handleUpdate={handleUpdate} />
			</div>
		</div>
	);
}

export default App;
