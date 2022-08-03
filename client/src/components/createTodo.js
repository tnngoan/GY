import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

export const options = [
	{ label: "Category", value: "" },
	{ label: "Recreational", value: "recreational" },
	{ label: "Social", value: "social" },
	{ label: "DIY", value: "diy" },
	{ label: "Charity", value: "charity" },
	{ label: "Cooking", value: "cooking" },
	{ label: "Relaxation", value: "relaxation" },
	{ label: "Music", value: "music" },
	{ label: "Busywork", value: "busywork" },
	{ label: "Education", value: "education" },
]

export const CreateTodo = ({ handleUpdate }) => {
	const [data, setdata] = useState({ title: "", category: "" })

	function handleChange(e) {
		setdata((data) => ({ ...data, [e.target.name]: e.target.value }));
		console.log(data)
	}

	function handleSubmit(e) {
		e.preventDefault();
		alert("Creating task " + data.title)
		axios.post("http://localhost:8000/api/todo", data).then((res) => {
			setdata({ title: "", category: "" })
			console.log(res.data.message);
		}).catch((err) => {
			console.log(err.message)
			alert("Fill in the blank!")
		})
	}
	return (
		<div>

			<section>
				<form onSubmit={(e) => {
					handleSubmit(e)
					handleUpdate()
				}} type="text">
					<div className='flex items-baseline justify-between p-4'>
						<label htmlFor='title'>
							Title
						</label>
						<input onChange={handleChange} type="text" name="title" value={data.title} className="outline p-2 mx-2" />
						<select name="category" value={data.category} onChange={handleChange}>
							{options.map((option, i) => (
								<option key={i} value={option.value}>{option.label}</option>
							))}
						</select>
					</div>
					<button type="submit" className='float-right px-4 m-4'>
						Create
					</button>
				</form>
			</section>
		</div>

	)
}

export default CreateTodo