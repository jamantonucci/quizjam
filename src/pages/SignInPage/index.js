import { NavLink } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { useRef, useState } from 'react';
import { SignIn } from '../../database/authenticate';

export default function SignInPage() {
	const [showSuccess, setShowSuccess] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleSignIn(e) {
		SignIn(emailRef.current.value, passwordRef.current.value);
	}

	return (
		<PageContainer>
			<div>Sign In Page</div>
			<NavLink to='/signup'>Need to create an account?</NavLink>

			{/* CONDITIONALLY DISPLAY ERROR MESSAGES */}
			{errorMessages.length > 0 && (
				<div>
					Something went wrong:
					<ul>
						{errorMessages.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}

			{/* CONDITIONALLY DISPLAY SUCCESS MESSAGE */}
			{showSuccess && <div>Sign up successful!</div>}

			<form onSubmit={handleSignIn}>
				<p>
					<label>
						Email:
						<input
							type='email'
							autoComplete='username'
							placeholder='Email'
							ref={emailRef}
						/>
					</label>
				</p>
				<p>
					<label>
						Password:
						<input
							type='password'
							autoComplete='current-password'
							ref={passwordRef}
						/>
					</label>
				</p>
				<button type='submit'>Sign In</button>
			</form>
		</PageContainer>
	);
}
