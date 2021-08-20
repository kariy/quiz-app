import styled, { keyframes } from 'styled-components';

const extend = keyframes`
    from {
        width: 0%
    }

    to {
        width: 100%
    }
`;

const Container = styled.div<{ duration: string }>`
	height: 10px;
	width: 100%;
	border-radius: 0.2rem;
	background: var(--system-pink);
	border-radius: 100px;
	animation-name: ${extend};
	animation-duration: ${(props) => props.duration || '1000ms'};
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;
`;

interface Props {
	duration: string;
}

export default function BarLoader({ duration }: Props) {
	return <Container id="bar-loader" duration={duration}></Container>;
}
