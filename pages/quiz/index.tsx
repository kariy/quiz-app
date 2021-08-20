import { NextPage } from 'next';
import { FormEventHandler, useEffect, useState } from 'react';
import useQuizReducer from '../../libs/hooks/useQuizReducer';
import { QuizInfo } from '../../libs/types/quizTypes';
import Result from './Result';
import Question from './Question';
import { getCategoryName } from '../../libs/utils/quiz';
import styled from 'styled-components';
import Head from 'next/head';
import { APP_NAME } from '../../libs/utils/constants';
import BarLoader from '../../libs/components/Loaders/BarLoader';
import QuizSkeletonLoader from '../../libs/components/Loaders/QuizSkeletonLoader';

const Container = styled.div`
	position: relative;
	padding-top: 60px;
	padding-bottom: 70px;

	#bar-loader {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 70px;
	}
`;

const Title = styled.div`
	color: var(--system-dark-pink);
	span {
		display: block;
	}

	.cat {
		font-weight: 700;
		font-size: 2rem;
		margin-bottom: 10px;
	}

	.diff {
		text-transform: capitalize;
		font-size: 1rem;
	}
`;

const QuizContainer: NextPage = () => {
	const { state, dispatch } = useQuizReducer();
	const [info, setInfo] = useState<QuizInfo | null>(null);

	useEffect(() => {
		if (state.quizInfo)
			setInfo({
				category: getCategoryName(state.quizInfo.category),
				difficulty: state.quizInfo.difficulty,
			});
	}, [state.quizInfo]);

	const handleAnswer: FormEventHandler<HTMLFormElement> = (event) => {
		const answer = event.target.value;

		dispatch({
			type: 'attempt',
			payload: { quesIndex: state.currentQuestionIndex, answer: answer },
		});

		setTimeout(() => {
			if (state.currentQuestionIndex === state.totalQuestion - 1)
				dispatch({ type: 'finish' });

			dispatch({ type: 'next' });
		}, 1000);
	};

	return (
		<>
			<Head>
				<title>Quiz | {APP_NAME}</title>
			</Head>
			<Container>
				{state.isLoading ? (
					<QuizSkeletonLoader />
				) : state.questions.length && !state.isFinish && info ? (
					<>
						<div>
							<Title>
								<span className="cat">{info.category}</span>
								{/* <span className="diff">{info.difficulty}</span> */}
							</Title>
							<Question
								details={
									state.questions[state.currentQuestionIndex]
								}
								onAnswer={handleAnswer}
								toChange={state.quesToChange}
								questionNo={state.currentQuestionIndex}
							/>
						</div>
						{state.quesToChange ? (
							<BarLoader
								key={`${state.currentQuestionIndex}_loader`}
								duration="700ms"
							/>
						) : (
							<></>
						)}
					</>
				) : state.isFinish && state.result && info ? (
					<Result result={state.result} quizInfo={info} />
				) : (
					<div>error</div>
				)}
			</Container>
		</>
	);
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
// 	const { category, difficulty, amount } = query;
// 	if (!category || !difficulty || !amount) return { props: {} };

// 	try {
// 		const res = await axios.get(
// 			`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
// 		);

// 		return {
// 			props: {
// 				quizQuestions: res.data.results,
// 				quizInfo: {
// 					category,
// 					difficulty,
// 				},
// 			},
// 		};
// 	} catch (err) {
// 		console.log(err);
// 		return { props: {} };
// 	}
// };

export default QuizContainer;
