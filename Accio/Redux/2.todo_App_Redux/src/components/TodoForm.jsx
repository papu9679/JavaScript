import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSclice.js';

const TodoForm = () => {
	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text.trim()) return;

		dispatch(addTodo(text));

		setText('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter a todo"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button type="submit">Add Todo</button>
		</form>
	);
};

export default TodoForm;
