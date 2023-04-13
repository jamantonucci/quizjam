import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { auth, db } from './config';
import {
	doc,
	updateDoc,
	setDoc,
	getDoc,
} from 'firebase/firestore';

async function SignUp(email, password) {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		const user = auth.currentUser;

		// Update firebase authentication
		await updateProfile(user, { displayName: 'QuizJam User' });

		// Update firestore
		await setDoc(doc(db, 'users', user.uid), { displayName: 'QuizJam User' });

		return user;
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
	const ref = doc(db, 'users', user.uid);
	try {
		// Update firebase auth
		await updateProfile(user, { displayName });

		// Update firestore
		await updateDoc(ref, {
			displayName: displayName,
		});
	} catch (error) {
		console.error(error);
	}
}

function GetCurrentUserInfo() {
	const user = auth.currentUser;
	const data = {
		id: user.uid,
		displayName: user.displayName,
	};
	return data;
}

async function GetDisplayNameFromId(id) {
	try {
		const docRef = doc(db, 'users', id);
		const docSnap = await getDoc(docRef);
		const data = docSnap.data();
		const displayName = data.displayName;
		return displayName;
	} catch (error) {
		console.error('Error getting display name: ', error);
	}
}

export {
	SignUp,
	SignIn,
	SignOut,
	ChangeDisplayName,
	GetCurrentUserInfo,
	GetDisplayNameFromId,
};
