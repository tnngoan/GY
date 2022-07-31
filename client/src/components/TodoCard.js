import React from 'react'

const TodoCard = ({ data, handleDelete, handleEdit }) => {
	const { _id, title, category } = data
	return (
		<li key={_id}>
			<div>
				<h3>{title}</h3>
				<p>{category}</p>
			</div>
			<div>
				<button name={_id} className="p-4 bg-gray-400" onClick={handleEdit}>
					edit
				</button>
				<button name={_id} className="p-4 bg-gray-400" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</li>
	)
}

export default TodoCard