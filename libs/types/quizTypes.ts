export type QuestionType = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export type QuestionAttempt = {
	question: QuestionType['question'];
	selected_answer: string | null;
};

export type UserAttempt = QuestionAttempt[];

interface EvaluatedAttempt extends QuestionAttempt {
	correct_answer: string;
}

export type QuizResult = {
	score: number;
	total_questions: number;
	attempt: EvaluatedAttempt[];
};

export type QuizInfo = {
	category: number | string;
	difficulty: string;
};
