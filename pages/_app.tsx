import '../styles/globals.css';
import type { AppProps } from 'next/app';

import MainHeader from '../libs/components/MainHeader';
import styled from 'styled-components';

const MaxContainer = styled.div`
	margin: 0 auto;
	width: min(90%, 600px);
`;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<MainHeader />
			<MaxContainer>
				<Component {...pageProps} />
			</MaxContainer>
		</>
	);
}
export default MyApp;
