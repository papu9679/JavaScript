import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleTodo } from '../features/todos/todoSlice';

const TodoList = () => {
	const todos = useSelector((state) => state.todos.items);

	const dispatch = useDispatch();

	return (
		<div>
			{todos.length === 0 && <p>No todos available.</p>}

			{todos.map((todo) => (
				<div key={todo.id}>
					<span
						onClick={() => dispatch(toggleTodo(todo.id))}
						style={{
							textDecoration: todo.completed ? 'line-through' : 'none',
							cursor: 'pointer',
						}}
					>
						{todo.text}
					</span>

					<button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
