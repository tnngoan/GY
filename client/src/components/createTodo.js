import React, { useState } from 'react'
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
	const [data, setData] = useState({ title: "", category: "" })

	function handleChange(e) {
		setData((data) => ({ ...data, [e.target.name]: e.target.value }));
		console.log(data)
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!data.title || !data.category) {
			alert("Fill in the blank!")
			return
		}
		alert("Creating task " + data.title)
		axios.post("http://localhost:8000/api/todo", data).then((res) => {
			setData({ title: "", category: "" })
			handleUpdate()
		}).catch((err) => {
			console.log(err.message)
		})
	}

	async function handleRandom(e) {
		e.preventDefault();
		let result;
		axios.get('https://www.boredapi.com/api/activity/').then((res) => {
			setData({ title: res.data.activity, category: res.data.type })
		})
		await setData({ title: result.activity, category: result.type })
	}

	return (
		<div>
			<section>
				<form onSubmit={(e) => {
					handleSubmit(e)
				}} type="text">
					<div className='flex items-baseline justify-between p-4'>
						<label htmlFor='title'>
							Title
						</label>
						<input onChange={handleChange} type="text" name="title" value={data.title} className="outline-none shadow-inner p-3 mx-1 rounded" />
						<select name="category" value={data.category} onChange={handleChange} className="p-3 rounded" >
							{options.map((option, i) => (
								<option key={i} value={option.value}>{option.label}</option>
							))}
						</select>
					</div>
					<button type="submit" className='float-right p-4 py-3 rounded m-4 bg-pink-500 shadow-xl'>
						Create
					</button>
				</form>
				<button onClick={(e) => {
					handleRandom(e)
				}} className='float-right p-4 py-3 rounded m-4 bg-pink-500 shadow-xl'>
					Random
				</button>
			</section>
		</div>

	)
}

export default CreateTodo