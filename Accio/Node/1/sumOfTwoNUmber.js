import { log } from 'console';
import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});


// rl.question('tell the number: ', (input) => {
// 	let num = input.split(' ').map((x) => Number(x));
// 	console.log(num[0] + num[1]);
// 	rl.close();
// });

rl.question('tell the number: ', (input) => {
	//size of arr
	//array elm
	//sum of arr elm
	//3 1 2 3
	let num = input.split(' '); //
	let arrSize = Number(num[0]);
	let sum = 0;
	let arr = [];
	for (let i = 1; i <= arrSize; i++) {
		arr[i - 1] = Number(num[i]);
		sum += arr[i - 1];
	}
	console.log(sum);
	console.log(arr);

	rl.close();
});
