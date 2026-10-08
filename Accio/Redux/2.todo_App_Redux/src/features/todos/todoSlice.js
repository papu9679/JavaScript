import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const todoSlice = createSlice({
	name: 'todos',

	initialState,

	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				id: Date.now(),
				text: action.payload,
				completed: false,
			};

			state.items.push(newTodo);
		},

		deleteTodo: (state, action) => {
			state.items = state.items.filter((todo) => todo.id !== action.payload);
		},

		toggleTodo: (state, action) => {
			const todo = state.items.find((todo) => todo.id === action.payload);

			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
