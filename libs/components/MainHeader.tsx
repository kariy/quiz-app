import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.header`
	background: var(--system-dark-pink);
	box-shadow: 0 3px 6px rgb(0, 0, 0, 0.25);
	/* border-bottom: 1px solid var(--light-gray); */
`;

const Wrapper = styled.div`
	width: min(95%, 1820px);
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80px;

	@media screen and (max-width: 450px) {
		height: 70px;
	}

	@media screen and (max-width: 670px) {
		width: 90%;
	}
`;

const Button = styled.div`
	/* background: white; */
	color: white;
	border: 2px solid white;
	font-weight: 500;
	padding: 0.5rem 1.5rem;
	border-radius: 0.85rem;
	display: flex;
	align-items: center;
	transition-property: background-color, color, fill;
	transition-duration: 150ms;
	transition-timing-function: ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: var(--system-dark-pink);
		color: white;

		svg {
			fill: white;
		}
	}
`;

export default function MainHeader() {
	return (
		<Container>
			<Wrapper>
				<Link href="/">
					<a>
						<img src="/logo_dark.png" alt="Berkuiz logo" />
					</a>
				</Link>
				{/* <div>
					<Link href="/">
						<a>
							<Button>
								<span style={{ marginRight: '3px' }}>
									Do a quiz
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="22px"
									viewBox="0 0 22 22"
									fill="white"
								>
									<path d="M0 0h24v24H0V0z" fill="none" />
									<path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" />
								</svg>
							</Button>
						</a>
					</Link>
				</div> */}
			</Wrapper>
		</Container>
	);
}
