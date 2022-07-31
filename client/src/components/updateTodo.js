import React, { useState } from 'react'
import axios from 'axios'
import { options } from './createTodo'

const UpdateTodo = ({ _id, handleClose, handleUpdate }) => {
	const [data, setData] = useState({ title: "", category: "" });

	function handleChange(e) {
		setData((data) => ({ ...data, [e.target.name]: e.target.value }));
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
		<div>
			<form onSubmit={(e) => {
				handleSubmit(e)
				handleUpdate()
				handleClose()
			}}
				className="flex flex-cols justify-between" type="text" noValidate >
				<div className='flex'>
					<label htmlFor='title'>
						Title
					</label>
					<input onChange={handleChange} type="text" name="title" value={data.title} className="outline p-2 m-3" />
					<select name="category" value={data.category} onChange={handleChange}>
						{options.map((option, i) => (
							<option key={i} value={option.value}>{option.label}</option>
						))}
					</select>
				</div>
				<button type="submit" className='flex float-right'>
					Update
				</button>
			</form>
		</div>
	)
}

export default UpdateTodo