import React, { useState } from 'react'
import axios from 'axios'

const UpdateTodo = ({ _id, handleClose, handleUpdate }) => {
	const [data, setData] = useState({ title: "", category: "" });

	function handleChange(e) {
		setData((data) => ({ ...data, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log({ _id }, { data });
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
				type="text" noValidate >
				<label htmlFor='title'>
					Title
				</label>
				<input onChange={handleChange} type="text" name="title" value={data.title} />
				<label htmlFor='category'>
					Category
				</label>
				<select name="category" defaultValue="busywork" onSelect={handleChange}>
					<option name="education" value="education" >Edutcation</option>
					<option value={data.category} >Recreational</option>
					<option value={data.category} >Social</option>
					<option value={data.category} >DIY</option>
					<option value={data.category} >Charity</option>
					<option value={data.category} >Cooking</option>
					<option value={data.category} >Relaxation</option>
					<option value={data.category} >Busywork</option>
				</select>
				<button type="submit">
					Update
				</button>
			</form>
		</div>
	)
}

export default UpdateTodo