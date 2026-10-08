import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Create Gemini client
const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

// Create CLI interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Create Gemini chat session
const chat = await ai.chats.create({
	model: 'gemini-2.5-flash',
});

// Welcome message
console.log('\n=================================');
console.log('        🤖 GEMINI CLI BOT');
console.log('=================================');
console.log('Type your question and press Enter.');
console.log("Type 'exit' to quit.");
console.log('=================================\n');

// Function to ask questions
function askQuestion() {
	rl.question('You: ', async (question) => {
		// Remove extra spaces
		question = question.trim();

		// Exit command
		if (question.toLowerCase() === 'exit') {
			console.log('\nGemini: Goodbye! 👋\n');
			rl.close();
			return;
		}

		// Empty input
		if (!question) {
			console.log('Please enter a question.\n');
			askQuestion();
			return;
		}

		try {
			// Send question to Gemini
			const response = await chat.sendMessage({
				message: question,
			});

			// Display Gemini response
			console.log('\nGemini:', response.text);
			console.log();
		} catch (error) {
			console.error('\n❌ Error:', error.message);
			console.log();
		}

		// Ask for another question
		askQuestion();
	});
}

// Start chatbot
askQuestion();
