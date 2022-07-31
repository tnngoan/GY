import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const options = [
	{ label: "Category", value: "" },
	{ label: "Recreational", value: "recreational" },
	{ label: "Social", value: "social" },
	{ label: "DIY", value: "diy" },
	{ label: "Charity", value: "charity" },
	{ label: "Cooking", value: "cooking" },
	{ label: "Relaxation", value: "relaxation" },
	{ label: "Busywork", value: "busywork" },
	{ label: "Education", value: "education" },
]

export const CreateTodo = () => {
	const [data, setData] = useState({ title: "", category: "" })

	function handleChange(e) {
		setData((data) => ({ ...data, [e.target.name]: e.target.value }));
		console.log(data)
	}

	function handleSubmit(e) {
		e.preventDefault();
		const todo = {
			title: data.title,
			catogory: data.category
		}
		console.log({ todo });
		axios.post("http://localhost:8000/api/todo", data).then((res) => {
			setData({ title: "", category: "" })
			console.log(res.data.message);
		}).catch((err) => {
			console.log("Error: cannot create todo")
			console.log(err.message)
		})
	}
	return (
		<section>
			{/* <Link to="/" className=''>
				<button type="button">
					go back
				</button>
			</Link> */}
			<div>
				<form onSubmit={handleSubmit} type="text" noValidate>
					<label htmlFor='title'>
						Title
					</label>
					<input onChange={handleChange} type="text" name="title" value={data.title} className="outline p-2 mx-2" />
					<select name="category" value={data.category} onChange={handleChange}>
						{options.map((option, i) => (
							<option key={i} value={option.value}>{option.label}</option>
						))}
					</select>
					<button type="submit">
						Create
					</button>
				</form>
			</div>
		</section>
	)
}

export default CreateTodo