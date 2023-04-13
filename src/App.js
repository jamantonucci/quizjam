import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import ResultsPage from './pages/ResultsPage';
import CreatePage from './pages/CreatePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';
import { useEffect, useState } from 'react';
import * as database from '../src/database';
import { useDispatch } from 'react-redux';
import { setQuizzes } from './redux/quizSlice';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const quizzes = await database.GetQuizzesFromDb();
			dispatch(setQuizzes(quizzes));
			setIsLoading(false);
		})();
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<Header />

			{isLoading && <div>Loading...</div>}

			{!isLoading && (
				<Routes>
					{/* Home Page */}
					<Route path='/' element={<HomePage />} />

					{/* Quiz - Taking */}
					<Route path='/quiz/:id' element={<QuizPage />} />
					<Route path='/quiz/test' element={<QuizPage />} />
					<Route path='/quiz/:id/result' element={<ResultsPage />} />

					{/* Quiz - Creating */}
					<Route path='/create' element={<CreatePage />} />

					{/* Sign In/Sign Up */}
					<Route path='/signin' element={<SignInPage />} />
					<Route path='/signup' element={<SignUpPage />} />

					{/* User Page */}
					<Route path='/settings' element={<UserPage />} />

					{/* 404 */}
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			)}
		</>
	);
}
