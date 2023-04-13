import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './config';


async function SignUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
}

async function SignIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

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

export { SignUp, SignIn, SignOut };