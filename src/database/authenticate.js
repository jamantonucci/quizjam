import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { auth } from './config';

async function SignUp(email, password) {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		const user = auth.currentUser;
		await updateProfile(user, { displayName: 'QuizJam User' });
	} catch (error) {
		console.error(error);
	}
}

async function SignIn(email, password) {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		return auth.currentUser;
	} catch (error) {
		console.error(error);
	}
}

async function SignOut() {
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error);
	}
}

async function ChangeDisplayName(displayName) {
	const user = auth.currentUser;
	try {
		await updateProfile(user, { displayName });
	} catch (error) {
		console.error(error);
	}
}

function GetCurrentUserInfo() {
	const user = auth.currentUser;
	const data = {
		id: user.uid,
		displayName: user.displayName
	}
	return data;
}

export { SignUp, SignIn, SignOut, ChangeDisplayName, GetCurrentUserInfo };
