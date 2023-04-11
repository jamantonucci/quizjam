import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import ResultsPage from './pages/ResultsPage';
import CreatePage from './pages/CreatePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

export default function App() {
	return (
		<>
			<Header />

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

				{/* 404 */}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);
}
