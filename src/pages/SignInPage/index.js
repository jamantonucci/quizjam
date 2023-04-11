import { NavLink, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { useRef, useState } from 'react';
import * as database from '../../database';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/userSlice';

export default function SignInPage() {
	const [errorMessages, setErrorMessages] = useState([]);
	const emailRef = useRef();
	const passwordRef = useRef();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function handleSignIn (e) {
		e.preventDefault();

		try {
			await database.SignIn(emailRef.current.value, passwordRef.current.value);
			dispatch(logIn());
			navigate('/settings');

		} catch (error) {
			console.error(error);
		}
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
