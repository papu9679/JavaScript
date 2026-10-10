import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({
	input: stdin,
	output: stdout,
});

const a = Number(await rl.question('Enter first number: '));
const operator = await rl.question('Enter operator (+, -, *, /): ');
const b = Number(await rl.question('Enter second number: '));

switch (operator) {
	case '+':
		console.log('Result:', a + b);
		break;
	case '-':
		console.log('Result:', a - b);
		break;
	case '*':
		console.log('Result:', a * b);
		break;
	case '/':
		console.log(b !== 0 ? a / b : 'Cannot divide by zero');
		break;
	default:
		console.log('Invalid operator');
}

rl.close();
