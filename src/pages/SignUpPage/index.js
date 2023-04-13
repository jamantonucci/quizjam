import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import * as database from '../../database';
import { logIn } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function SignUpPage() {
	const [errorMessages, setErrorMessages] = useState([]);
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function handleSignUp(e) {
		e.preventDefault();

		// Validate form
		const validate = [];

		if (emailRef.current.value.length === 0) {
			validate.push('Please enter a valid email address.');
		}

		if (passwordRef.current.value.length < 8) {
			validate.push('Your password must be at least 8 characters long.');
		}

		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			validate.push('Your passwords do not match. Please try again.');
		}

		setErrorMessages(validate);

		// If all data is valid:
		if (validate.length === 0) {
			try {
				await database.SignUp(
					emailRef.current.value,
					passwordRef.current.value
				);
				dispatch(logIn());
				navigate('/settings');
			} catch (error) {
				console.error(error);
			}
		}
	}
	return (
		<PageContainer>
			<div>Register</div>

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

			<form onSubmit={handleSignUp}>
				<p>
					<label>
						Email:{' '}
						<input
							type='email'
							autoComplete='username'
							placeholder='Email'
							minLength={1}
							ref={emailRef}
						/>
					</label>
				</p>
				<p>
					<label>
						Password:{' '}
						<input
							type='password'
							autoComplete='new-password'
							ref={passwordRef}
						/>
					</label>
				</p>
				<p>
					<label>
						Confirm Password:{' '}
						<input
							type='password'
							autoComplete='new-password'
							ref={confirmPasswordRef}
						/>
					</label>
				</p>

				<button type='submit'>Sign Up</button>
			</form>
		</PageContainer>
	);
}
