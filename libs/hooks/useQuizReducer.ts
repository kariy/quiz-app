import { useEffect, useReducer } from 'react';
import getQuiz from '../../pages/quiz/getQuiz';
import {
	QuestionType,
	QuestionAttempt,
	UserAttempt,
	QuizResult,
	QuizInfo,
} from '../types/quizTypes';
import { evaluateQuiz, getOptionsFromStorage } from '../utils/quiz';

export type Action = {
	type:
		| 'init'
		| 'attempt'
		| 'next'
		| 'previous'
		| 'finish'
		| 'error'
		| 'loading';
	payload?: {
		questions?: QuestionType[];
		attempt?: any;
		quesIndex?: number;
		answer?: string;
		quizInfo?: QuizInfo;
	};
};

export type State = {
	quizInfo: QuizInfo | undefined | null;
	questions: QuestionType[] | undefined | null;
	totalQuestion: number | undefined | null;
	currentAttempt: UserAttempt | undefined | null;
	currentQuestionIndex: number | undefined | null;
	isFinish: boolean | undefined | null;
	quesToChange: boolean | undefined | null;
	result: QuizResult | undefined | null;
	isError: boolean | undefined | null;
	isLoading: boolean | undefined | null;
};

const initState: State = {
	quizInfo: null,
	questions: [],
	totalQuestion: 0,
	currentAttempt: [],
	currentQuestionIndex: 0,
	isFinish: false,
	quesToChange: false,
	result: null,
	isError: false,
	isLoading: false,
};

const reducer = (state: State, action: Action): State => {
	const { type, payload } = action;
	switch (type) {
		case 'init':
			return {
				...state,
				questions: payload?.questions,
				totalQuestion: payload?.questions?.length,
				currentAttempt: payload?.attempt,
				quizInfo: payload?.quizInfo,
				isLoading: false,
			};
		case 'error':
			return {
				...state,
				isError: true,
			};
		case 'loading':
			return { ...state, isLoading: true };
		case 'attempt': {
			const newAttempt = [...state.currentAttempt];
			newAttempt[payload.quesIndex].selected_answer = payload.answer;

			return {
				...state,
				quesToChange: true,
				currentAttempt: newAttempt,
			};
		}
		case 'next': {
			const index =
				state.currentQuestionIndex < state.totalQuestion - 1
					? state.currentQuestionIndex + 1
					: state.currentQuestionIndex;

			return {
				...state,
				quesToChange: false,
				currentQuestionIndex: index,
			};
		}
		case 'previous': {
			const index =
				state.currentQuestionIndex > 0
					? state.currentQuestionIndex + 1
					: state.currentQuestionIndex;

			return {
				...state,
				currentQuestionIndex: index,
			};
		}
		case 'finish': {
			const result = evaluateQuiz(state.questions, state.currentAttempt);

			return { ...state, isFinish: true, result };
		}
	}
};

export default function useQuizReducer() {
	const [state, dispatch] = useReducer(reducer, initState);

	useEffect(() => {
		const options = getOptionsFromStorage();
		const info = {
			category: options.category,
			difficulty: options.difficulty,
		};

		dispatch({ type: 'loading' });

		getQuiz(options)
			.then((questions) => {
				dispatch({
					type: 'init',
					payload: {
						questions: questions,
						attempt: setAttempt(questions),
						quizInfo: info,
					},
				});
			})
			.catch((err) => {
				dispatch({ type: 'error' });
			});
	}, []);

	return { state, dispatch };
}

function setAttempt(questions: QuestionType[]) {
	let attempt: UserAttempt = [];
	for (const q of questions) {
		const attemptItem: QuestionAttempt = {
			question: q.question,
			selected_answer: null,
		};

		attempt.push(attemptItem);
	}

	return attempt;
}
