import styled from 'styled-components';

const Loader = styled.div`
	background: var(--color--skeleton-loader);
	height: 15px;
	border-radius: 50px;
	position: relative;
	overflow: hidden;

	@keyframes move {
		to {
			transform: translateX(0);
		}

		from {
			transform: translateX(-50%);
		}
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		top: 0;
		width: 200%;
		background: rgb(217, 217, 217);
		background: linear-gradient(
			90deg,
			rgba(217, 217, 217, 1) 0%,
			rgba(231, 231, 231, 1) 50%,
			rgba(217, 217, 217, 1) 100%
		);

		animation-name: move;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
`;

const Container = styled.div`
	margin-top: 40px;
	margin-bottom: 30px;

	.quiz-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		border-radius: 13px;
		padding: 0.7rem 1.1rem;
		background: var(--color--skeleton-container);
		height: 40px;
		color: white;
		font-weight: 500;

		${Loader} {
			width: 20%;
		}

		${Loader}:last-child {
			width: 10%;
		}
	}
`;

const QuestionWrapper = styled.div`
	margin-top: 30px;
	position: relative;
	min-height: 230px;
	background: var(--color--skeleton-container);
	border-radius: var(--rounded-md);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	${Loader}:first-child {
		margin-bottom: 10px;
		width: 60%;
	}

	${Loader}:last-child {
		width: 40%;
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

    .option {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--rounded-sm);
        background var(--color--skeleton-container);

        ${Loader} {
            width: 50%;
        }
    }
`;

export default function QuizSkeletonLoader() {
	return (
		<>
			<Container>
				<div className="quiz-info">
					<Loader />
					<Loader />
				</div>
				<QuestionWrapper>
					<Loader />
					<Loader />
				</QuestionWrapper>
				<OptionsForm>
					<div className="option">
						<Loader />
					</div>
					<div className="option">
						<Loader />
					</div>
					<div className="option">
						<Loader />
					</div>
					<div className="option">
						<Loader />
					</div>
				</OptionsForm>
			</Container>
		</>
	);
}
