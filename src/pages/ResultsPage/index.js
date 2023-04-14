import PageContainer from '../../components/PageContainer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QuizResult from '../../components/Quiz/QuizResult';
import './styles.scss';

export default function ResultsPage() {
	const params = useParams();
	const quizID = useSelector((state) => state.user.quizInProgress);
	const quiz = useSelector((state) =>
		state.quiz.quizzes.find((quiz) => quiz.id === quizID)
	);
	const results = quiz.results;
	const result = results.find((result) => result.id === params.id);

	return (
		<PageContainer>
			<QuizResult quiz={quiz} result={result} />

			<div className='results-nav'>
				<Link to={'/quiz/' + quizID} className='linkbutton'>
					Retake Quiz
				</Link>
				<Link to='/' className='linkbutton'>
					Back to Home
				</Link>
			</div>
		</PageContainer>
	);
}
