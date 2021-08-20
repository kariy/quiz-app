import styled from 'styled-components';
import { unescapeHTML } from '../../libs/utils/quiz';

const TextWrapper = styled.div`
	text-align: center;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	border-radius: var(--rounded-sm);
	border: 1px solid var(--system-pink);
	color: var(--system-pink);
	user-select: none;
	transition: background 150ms ease-in-out;
`;

const Label = styled.label`
	position: relative;
	cursor: pointer;

	&:hover > ${TextWrapper} {
		background: var(--system-pink);
		color: white;
		border: none;
	}

	input:checked + ${TextWrapper} {
		background-color: var(--system-pink);
		border: none;
		color: white;
	}
`;

interface Props {
	question: string;
	answers: string[];
}

export default function Answers({ question, answers }: Props) {
	return (
		<>
			{answers.map((option) => (
				<Label key={`${question}_${option}`} id={`label_${option}`}>
					<input type="radio" name="answers" value={option} />
					<TextWrapper>{unescapeHTML(option)}</TextWrapper>
				</Label>
			))}
		</>
	);
}
