import PageContainer from '../../components/PageContainer';
import { useSelector, useDispatch } from 'react-redux';
import * as database from '../../database';
import { useNavigate } from 'react-router-dom';
import { logOut, changeDisplayName } from '../../redux/userSlice';
import { useState } from 'react';

export default function UserPage() {
	const [showChangeDisplayName, setShowChangeDisplayName] = useState(false);
	const [displayName, setDisplayName] = useState(
		useSelector((state) => state.user.username)
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	async function handleSignOut(e) {
		e.preventDefault();

		try {
			await database.SignOut();
			dispatch(logOut());
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	}

	async function handleChangeDisplayName(e) {
		e.preventDefault();

		if (showChangeDisplayName) {
			dispatch(changeDisplayName(displayName));
			setShowChangeDisplayName(false);
		} else {
			setShowChangeDisplayName(true);
		}
	}

	return (
		<PageContainer>
			<h1>User Settings</h1>
			<div>
				Display Name:
				{!showChangeDisplayName && <span>{displayName}</span>}
				{showChangeDisplayName && (
					<input
						type='text'
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						minLength={3}
						maxLength={50}
					></input>
				)}
				<button onClick={handleChangeDisplayName}>Change</button>
			</div>
			<div>
				<button onClick={handleSignOut}>Sign Out</button>
			</div>
		</PageContainer>
	);
}
