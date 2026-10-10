import 'dotenv/config';
import OpenAI from 'openai';
import readline from 'node:readline/promises';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log('🤖 CLI Chatbot');
console.log("Type 'exit' to quit.\n");

let previousResponseId = null;

while (true) {
	const userInput = await rl.question('You: ');

	if (userInput.toLowerCase() === 'exit') {
		console.log('Bot: Goodbye 👋');
		break;
	}

	try {
		const response = await openai.responses.create({
			model: 'gpt-5.6-luna',
			input: userInput,

			// Gives the conversation continuity
			previous_response_id: previousResponseId,
		});

		console.log(`\nBot: ${response.output_text}\n`);

		previousResponseId = response.id;
	} catch (error) {
		console.error('Error:', error.message);
	}
}

rl.close();
