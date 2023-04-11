import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/quiz/:id' element={<QuizPage />} />
				<Route path='/quiz/test' element={<QuizPage />} />
				<Route path='/quiz/:id/result' element={<ResultsPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);
}
