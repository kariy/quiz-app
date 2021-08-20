import { QuizAPIOptions } from '../../pages/quiz/getQuiz';
import { QuestionType, QuizResult, UserAttempt } from '../types/quizTypes';

export function evaluateQuiz(quiz: QuestionType[], attempt: UserAttempt) {
	const length = quiz.length === attempt.length ? quiz.length : 0;

	if (!length) return null;

	const result: QuizResult = {
		score: 0,
		total_questions: length,
		attempt: [],
	};

	for (let i = 0; i < length; i++) {
		if (quiz[i].correct_answer === attempt[i].selected_answer)
			result.score++;

		const n = {
			question: quiz[i].question,
			selected_answer: attempt[i].selected_answer,
			correct_answer: quiz[i].correct_answer,
		};
		result.attempt.push(n);
	}

	return result;
}

export function setRandomizeAnswers(
	incorrect_answers: string[],
	correct_answer: string
) {
	const TOTAL_ANSWERS = 4;
	const answers: string[] = [];

	const randIndex = Math.floor(Math.random() * 4);
	answers[randIndex] = correct_answer;

	for (let i = 0, j = 0; i < TOTAL_ANSWERS; i++) {
		if (answers[i]) continue;

		answers[i] = incorrect_answers[j];
		j++;
	}

	return answers;
}

export function unescapeHTML(str: string) {
	return str.replace(
		/&amp;|&lt;|&gt;|&#039;|&deg;|&rsquo;|&quot;/g,
		(tag) =>
			({
				'&amp;': '&',
				'&lt;': '<',
				'&gt;': '>',
				'&#039;': "'",
				'&rsquo;': "'",
				'&deg;': '°',
				'&quot;': '"',
			}[tag] || tag)
	);
}

export function getCategoryName(n: number | string) {
	switch (Number(n)) {
		case 17:
			return 'Science & Nature';
		case 26:
			return 'Celebrities';
		case 27:
			return 'Animals';
		case 20:
			return 'Mythology';
		default:
			return 'N/A';
	}
}

export function validateQuizAPIOptions(options: QuizAPIOptions) {
	const { category, difficulty, amount } = options;

	if (!category || !difficulty || !amount)
		throw new Error('Options field not sufficient');
}

export function setOptionsToStorage(options: QuizAPIOptions) {
	const { category, difficulty, amount } = options;

	validateQuizAPIOptions(options);

	sessionStorage.setItem('quiz_category', category.toString());
	sessionStorage.setItem('quiz_difficulty', difficulty);
	sessionStorage.setItem('quiz_amount', amount.toString());
}

export function getOptionsFromStorage(): QuizAPIOptions {
	const options: QuizAPIOptions = {
		category: Number(sessionStorage.getItem('quiz_category')),
		amount: sessionStorage.getItem('quiz_amount'),
		difficulty: sessionStorage.getItem('quiz_difficulty'),
	};

	return options;
}
