import styled from 'styled-components';
import Link from 'next/link';
import { QuizInfo, QuizResult } from '../../../libs/types/quizTypes';

const Container = styled.div`
	h1 {
		font-size: 2rem;
		color: var(--system-dark-pink);
		margin-bottom: 50px;
	}
`;

const ResultWrapper = styled.div`
	padding: 1.5rem 2.7rem;
	height: 190px;
	border-radius: var(--rounded-lg);
	background: var(--system-dark-pink);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	text-transform: capitalize;

	div:first-child {
		span {
			display: block;
			margin-bottom: 12px;
		}

		span:first-child {
			font-weight: 700;
			font-size: 1.875rem;
		}

		span:last-child {
			margin-bottom: 0;
		}
	}

	.score {
		/* font-weight: 700; */
		font-size: 4.375rem;
	}
`;

const Button = styled.div`
	cursor: pointer;
	border: 3px solid var(--system-pink);
	border-radius: var(--rounded-md);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 55px;
	color: var(--system-pink);
	transition-property: background;
	transition-duration: 150ms;
	transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

	&:hover {
		background: var(--system-pink);
		color: white;
		fill: var(--system-pink);

		.icon {
			fill: white;
			rotate: -360deg;
		}
	}

	& > div {
		display: flex;
		align-items: center;
	}

	.text {
		font-weight: 700;
		font-size: 1.125rem;
		margin-right: 8px;
	}

	.icon {
		transition-property: rotate;
		transition-duration: 1.5s;
		transition-timing-function: ease-in-out;
	}
`;

interface Props {
	result: QuizResult;
	quizInfo: QuizInfo;
}

export default function Result({ result, quizInfo }: Props) {
	return (
		<Container>
			<h1>Your result.</h1>
			<ResultWrapper>
				<div>
					<span>{quizInfo.category}</span>
					<span>{quizInfo.difficulty}</span>
					<span>{result.total_questions} Questions</span>
				</div>
				<div className="score">
					{result.score}/{result.total_questions}
				</div>
			</ResultWrapper>
			<Link href="/">
				<a>
					<Button>
						<div>
							<span className="text">Start another quiz</span>
							<svg
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="#FB6681"
								xmlns="http://www.w3.org/2000/svg"
								className="icon"
							>
								<path d="M5.82083 5.82091C7.315 4.32674 9.4325 3.46508 11.7608 3.70341C15.125 4.04257 17.8933 6.77424 18.2692 10.1384C18.7733 14.5842 15.3358 18.3334 11 18.3334C8.07583 18.3334 5.56417 16.6192 4.39083 14.1534C4.0975 13.5392 4.5375 12.8334 5.21583 12.8334C5.555 12.8334 5.87583 13.0167 6.0225 13.3192C7.05833 15.5467 9.5425 16.9584 12.2558 16.3534C14.2908 15.9042 15.9317 14.2451 16.3625 12.2101C17.1325 8.65341 14.4283 5.50007 11 5.50007C9.47833 5.50007 8.12167 6.13258 7.13167 7.13174L8.51583 8.51591C9.09333 9.09341 8.69 10.0834 7.87417 10.0834L4.58333 10.0834C4.07917 10.0834 3.66667 9.67091 3.66667 9.16674L3.66667 5.87591C3.66667 5.06008 4.65667 4.64758 5.23417 5.22508L5.82083 5.82091V5.82091Z" />
							</svg>
						</div>
					</Button>
				</a>
			</Link>
		</Container>
	);
}
