import PageContainer from '../../components/PageContainer';
import { NavLink } from 'react-router-dom';
import QuizPreview from '../../components/Quiz/QuizPreview';
import { useSelector } from 'react-redux';
import './styles.scss';

export default function HomePage() {
	let quizzes = useSelector((state) => state.quiz.quizzes);

	return (
		<PageContainer>
			<div>
				<h1 className='barh1'>Welcome to QuizJam!</h1>
				<div className='createQuizButton'>
					<NavLink to='/create' className='linkbutton'>
						Create New Quiz
					</NavLink>
				</div>
			</div>
			<div>
				<h2>Recommended Quizzes:</h2>
				{quizzes.map((quiz, index) => (
					<QuizPreview key={index} {...quiz} />
				))}
			</div>
		</PageContainer>
	);
}
