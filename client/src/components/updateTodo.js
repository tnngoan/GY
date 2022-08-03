import React, { useState } from 'react'
import axios from 'axios'
import { options } from './createTodo'

const UpdateTodo = ({ _id, handleClose, handleUpdate, editData }) => {
	const [data, setData] = useState({ title: editData[0], category: editData[1] });

	function handleChange(e) {
		setData(({ ...data, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.put(`http://localhost:8000/api/todo/${_id}`, data)
			.then((res) => {
				setData({ title: "", description: "" });
				console.log(res.data.message);
			})
			.catch((err) => {
				console.log("Failed to update todo");
				console.log(err.message);
			});
	}

	return (
		<div className='flex items-baseline mx-4'>
			<form onSubmit={(e) => {
				handleSubmit(e)
				handleUpdate()
				handleClose()
			}}
				className="flex justify-between items-center" type="text" noValidate >
				<div className='flex items-baseline'>
					<label htmlFor='title'>
						Title
					</label>
					<input onChange={handleChange} type="text" name="title" value={data.title} className="shadow-inner rounded p-3 m-3" />
					<select name="category" value={data.category} onChange={handleChange} className="px-4 py-3 rounded" >
						{options.map((option, i) => (
							<option key={i} value={option.value}>{option.label}</option>
						))}
					</select>
				</div>
				<button type="submit" className='flex float-right justifly-center items-center bg-pink-400 py-3 px-4 mx-3 rounded shadow-xl'>
					Update
				</button>
			</form>
		</div>
	)
}

export default UpdateTodo