import { FormEventHandler, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { QuestionType } from '../../../libs/types/quizTypes';
import Answers from './Answers';
import { setRandomizeAnswers, unescapeHTML } from '../../../libs/utils/quiz';

const move = keyframes`
    from {
        transform: translateX(0)
    }

    to {
        transform: translateX(-50%)
    }
`;

const Container = styled.div`
	margin-top: 40px;
	margin-bottom: 30px;

	.quiz-info {
		display: flex;
		justify-content: space-between;
		background: white;
		border-radius: 13px;
		padding: 0.7rem 1.1rem;
		background: var(--system-dark-pink);
		/* border: 3px solid var(--system-dark-pink); */
		color: white;
		font-weight: 500;

		.title {
			/* margin-right: 10px; */
		}
	}
`;

const QuestionWrapper = styled.div`
	margin-top: 30px;
	position: relative;
	width: 100%;
	min-height: 230px;
	overflow: hidden;
	border-radius: var(--rounded-md);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 1.5rem;
	color: white;
	padding: 2rem 3rem;
	text-align: center;

	&::before {
		width: 200%;
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 0;
		background: rgb(171, 62, 112);
		background: linear-gradient(
			45deg,
			rgba(171, 62, 112, 1) 0%,
			rgba(243, 72, 106, 1) 25%,
			rgba(255, 170, 130, 1) 50%,
			rgba(255, 212, 140, 1) 75%,
			rgba(255, 236, 138, 1) 100%
		);
		animation-name: ${move};
		animation-timing-function: ease-in-out;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
`;

const OptionsForm = styled.form`
	display: grid;
	grid-auto-rows: minmax(min-content, 60px);
	row-gap: 10px;
	margin-top: 20px;

	@media screen and (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: minmax(min-content, 70px);
		column-gap: 10px;
		/* margin-top: 40px; */
	}
`;

interface Props {
	details: QuestionType;
	onAnswer: FormEventHandler<HTMLFormElement>;
	toChange: boolean;
	questionNo: number;
}

export default function Question({
	details,
	onAnswer,
	toChange,
	questionNo,
}: Props) {
	const [answers, setAnswers] = useState<string[]>([]);

	useEffect(() => {
		setAnswers(
			setRandomizeAnswers(
				details.incorrect_answers,
				details.correct_answer
			)
		);
	}, [details]);

	return (
		<>
			<Container>
				<div className="quiz-info">
					<span className="title">Question</span>
					<span className="no">{questionNo + 1}</span>
				</div>
				<QuestionWrapper key={details.question}>
					{unescapeHTML(details.question)}
				</QuestionWrapper>
				<OptionsForm onChange={onAnswer}>
					<input type="hidden" value={details.question} />
					<Answers question={details.question} answers={answers} />
				</OptionsForm>
			</Container>
		</>
	);
}
