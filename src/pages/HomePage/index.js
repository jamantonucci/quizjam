import PageContainer from '../../components/PageContainer';
import { NavLink } from 'react-router-dom';
import QuizPreview from '../../components/Quiz/QuizPreview';
import { useSelector } from 'react-redux';

export default function HomePage() {
	let quizzes = useSelector((state) => state.quiz.quizzes);

	return (
		<PageContainer>
			<div>
				<h2>Welcome!</h2>
				<NavLink to='/create'>Create New Quiz</NavLink>
				<div>Create new quiz button</div>
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
