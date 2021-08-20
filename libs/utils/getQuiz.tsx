import axios from 'axios';
import { QuestionType } from '../types/quizTypes';
import { validateQuizAPIOptions } from './quiz';

export interface QuizAPIOptions {
	category: number;
	difficulty: string;
	amount: number;
}

export default async function getQuiz(
	options: QuizAPIOptions
): Promise<QuestionType[] | null> {
	const { category, difficulty, amount } = options;

	try {
		validateQuizAPIOptions(options);

		const res = await axios.get(
			`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
		);
		console.log('getquiz', res.data);

		return res.data.results;
	} catch (err) {
		return null;
	}
}
