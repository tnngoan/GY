import React from 'react'

const TodoCard = ({ data, func }) => {
	const { _id, title, category } = data
	return (
		<li key={_id}>
			<div className='flex justify-between'>
				<input type="checkbox" className='' onChange={func.handleUpdate} />
				<div>
					<h3>{title}</h3>
					<p>{category}</p>
				</div>
				<div>
					<button name={_id} className="p-2 m-2 border" onClick={func.handleEdit}>
						Edit
					</button>
					<button name={_id} className="p-2 border" onClick={func.handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</li>
	)
}

export default TodoCard