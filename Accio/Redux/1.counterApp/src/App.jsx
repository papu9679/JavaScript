import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	increment,
	decrement,
	reset,
	incrementByAmount,
} from './features/counter/counterSlice';

function App() {
	const [amount, setAmount] = useState('');

	const count = useSelector((state) => state.counter.value);

	const dispatch = useDispatch();

	const handleIncrementByAmount = () => {
		dispatch(incrementByAmount(Number(amount)));
		setAmount('');
	};

	return (
		<div>
			<h1>Redux Counter</h1>

			<h2>{count}</h2>

			<button onClick={() => dispatch(increment())}>Increment</button>

			<button onClick={() => dispatch(decrement())}>Decrement</button>

			<button onClick={() => dispatch(reset())}>Reset</button>

			<br />
			<br />

			<input
				type="text"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Enter amount"
			/>

			<button onClick={handleIncrementByAmount}>Add Amount</button>
		</div>
	);
}

export default App;
