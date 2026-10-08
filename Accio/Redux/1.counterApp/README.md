Sure. Let’s build a **simple Redux Counter App with React + Redux Toolkit**, keeping it clean and beginner-to-intermediate friendly.

We’ll use **ES Modules** (`"type": "module"`) as you requested earlier.

### 1. Create the project

```bash
npm create vite@latest redux-counter -- --template react
cd redux-counter
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```

### 2. Project structure

```text
src/
├── app/
│   └── store.js
├── features/
│   └── counter/
│       └── counterSlice.js
├── App.jsx
└── main.jsx
```

### 3. Create the Redux store

**`src/app/store.js`**

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

### 4. Create the counter slice

**`src/features/counter/counterSlice.js`**

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    reset: (state) => {
      state.value = 0;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
} = counterSlice.actions;

export default counterSlice.reducer;
```

### 5. Provide the Redux store to React

**`src/main.jsx`**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

The important part is:

```jsx
<Provider store={store}>
  <App />
</Provider>
```

Now every component inside `App` can access Redux state.

### 6. Use Redux in the component

**`src/App.jsx`**

```jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "./features/counter/counterSlice";

function App() {
  const [amount, setAmount] = useState("");

  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(amount)));
    setAmount("");
  };

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>{count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

      <br />
      <br />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <button onClick={handleIncrementByAmount}>
        Add Amount
      </button>
    </div>
  );
}

export default App;
```

### Redux flow

The important concept to understand is:

```text
Component
   ↓
dispatch(action)
   ↓
Redux Slice
   ↓
Reducer changes state
   ↓
Redux Store
   ↓
useSelector()
   ↓
Component re-renders
```

For example:

```jsx
dispatch(increment());
```

triggers:

```js
increment: (state) => {
  state.value += 1;
}
```

And we read the updated value using:

```js
const count = useSelector(
  (state) => state.counter.value
);
```

This gives you the basic Redux architecture you'll use later for things like **authentication, cart state, user state, and global application data**.