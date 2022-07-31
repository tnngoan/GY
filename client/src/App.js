// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowTodolist from './components/showTodolist';
import { CreateTodo } from "./components/createTodo";
import './App.css'
import React from 'react';

function App() {
	return (
		<div className='flex w-full border border-1 min-h-screen px-40'>
			<div className="border border-2 w-full m-2">
				<ShowTodolist />
			</div>
			<div className="border border-2 w-full m-2">
				<CreateTodo />
			</div>
		</div>
	);
}

export default App;
