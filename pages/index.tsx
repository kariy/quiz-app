import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { FormEventHandler } from 'react';
import styled from 'styled-components';
import { APP_NAME } from '../libs/utils/constants';
import { setOptionsToStorage } from '../libs/utils/quiz';
import { QuizAPIOptions } from '../libs/utils/getQuiz';

const Container = styled.div`
	padding-top: 100px;
	padding-bottom: 100px;
	min-height: 600px;
	height: calc(100vh - 80px);
	/* max-height: 1000px; */
	color: var(--system-dark-pink);
`;

const Wrapper = styled.div`
	width: 100%;

	h1 {
		margin: 0;
		font-size: 2.5rem;
		margin-bottom: 40px;
		text-align: center;
		color: var(--system-dark-pink);
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;

	.input-wrapper {
		display: flex;
		flex-flow: row wrap;
		flex: 1;
		row-gap: 20px;
		column-gap: 20px;

		label {
			display: flex;
			flex-direction: column;

			.text {
				font-weight: 500;
				margin-bottom: 10px;
			}

			.input {
				border: 1px solid var(--light-gray);
				border-radius: var(--rounded-sm);
				padding: 0.7rem 0.7rem;
			}
		}

		.category {
			width: 100%;
		}

		.difficulty,
		.total {
			flex: 1;
		}
	}

	button {
		cursor: pointer;
		border-radius: var(--rounded-md);
		margin-top: 40px;
		/* padding: 1.3rem 2rem; */
		height: 55px;
		text-align: center;
		font-size: 1.2rem;
		font-weight: 700;
		border: 3px solid var(--system-pink);
		color: var(--system-pink);
		transition-property: background;
		transition-duration: 150ms;
		transition-timing-function: ease-in-out;
	}

	button:hover {
		color: white;
		background: var(--system-pink);
	}
`;

const Home: NextPage = () => {
	const router = useRouter();

	const handleSubmit: FormEventHandler = (event) => {
		event.preventDefault();

		const { amount, category, difficulty } = event.target;

		const options: QuizAPIOptions = {
			amount: amount.value,
			category: category.value,
			difficulty: difficulty.value,
		};

		setOptionsToStorage(options);

		router.push('/quiz');
	};
	return (
		<>
			<Head>
				<title>Home | {APP_NAME}</title>
			</Head>
			<Container>
				<Wrapper>
					<h1>Start a quiz.</h1>
					<Form onSubmit={handleSubmit}>
						<div className="input-wrapper">
							<label className="category">
								<span className="text">Category</span>
								<select
									className="input"
									name="category"
									required
								>
									<option value=""></option>
									<option value="17">Science & Nature</option>
									<option value="26">Celebrities</option>
									<option value="27">Animals</option>
									<option value="20">Mythology</option>
								</select>
							</label>

							<label className="difficulty">
								<span className="text">Difficulty</span>
								<select
									className="input"
									name="difficulty"
									required
								>
									<option value=""></option>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</label>

							<label className="total">
								<span className="text">Total questions</span>
								<select
									className="input"
									name="amount"
									required
								>
									<option value=""></option>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="20">20</option>
								</select>
							</label>
						</div>
						<button>Start</button>
					</Form>
				</Wrapper>
			</Container>
		</>
	);
};

export default Home;
