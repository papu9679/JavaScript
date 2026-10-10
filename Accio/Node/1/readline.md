# `readline` in Node.js

The `readline` module in Node.js allows you to read input from the user, usually through the terminal. It is useful for building CLI applications, interactive programs, and coding practice tools.

## 1. Import `readline`

Since we are using ES Modules, import it like this:

```
import readline from "node:readline";
import { stdin, stdout } from "node:process";
```

Create an interface:

```
const rl = readline.createInterface({
    input: stdin,
    output: stdout
});
```

- `input`: Receives user input.
- `output`: Displays prompts and output.
- `createInterface()`: Creates an interface for terminal interaction.

## 2. `rl.question()` — Read user input

```
import readline from "node:readline";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

rl.question("Enter your name: ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
});
```

How it works:

1. Displays `Enter your name:`.
2. Waits for the user to enter input and press Enter.
3. Passes the input to the callback as `name`.
4. Closes the interface using `rl.close()`.

## 3. Read numeric input

Terminal input is received as a string, so convert it when necessary.

```
import readline from "node:readline";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

rl.question("Enter two numbers: ", (input) => {
    const [a, b] = input.split(" ").map(Number);

    console.log("Sum:", a + b);

    rl.close();
});
```

Example:

```
Enter two numbers: 10 20
Sum: 30
```

## 4. Using `readline` with `async/await`

For modern Node.js applications, you can use `node:readline/promises`. This avoids nesting callbacks and is convenient when reading multiple inputs.

```
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const name = await rl.question("Enter your name: ");
const age = await rl.question("Enter your age: ");

console.log(`Name: ${name}, Age: ${age}`);

rl.close();
```

Here, `await` pauses execution until the user provides the requested input.

## 5. `readline` methods to know

| Method                     | Purpose                                |
| -------------------------- | -------------------------------------- |
| `createInterface()`        | Creates a readline interface           |
| `rl.question()`            | Asks a question and reads one response |
| `rl.close()`               | Closes the interface                   |
| `rl.on("line", callback)`  | Handles each completed input line      |
| `rl.on("close", callback)` | Runs when the interface closes         |

## 6. Practical example: Simple CLI calculator

```
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const a = Number(await rl.question("Enter first number: "));
const operator = await rl.question("Enter operator (+, -, *, /): ");
const b = Number(await rl.question("Enter second number: "));

switch (operator) {
    case "+":
        console.log("Result:", a + b);
        break;
    case "-":
        console.log("Result:", a - b);
        break;
    case "*":
        console.log("Result:", a * b);
        break;
    case "/":
        console.log(b !== 0 ? a / b : "Cannot divide by zero");
        break;
    default:
        console.log("Invalid operator");
}

rl.close();
```

Recommendation: Use `node:readline/promises` with `async/await` for new CLI projects. Use the callback-based `node:readline` API when you specifically need callback-driven input or event-based processing.