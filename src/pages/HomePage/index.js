import PageContainer from '../../components/PageContainer';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
	return (
		<PageContainer>
			<div>
				<h2>Welcome!</h2>
				<NavLink to='/create'>Create New Quiz</NavLink>
				<div>Create new quiz button</div>
			</div>
      <div>
        <h2>Recommended Quizzes:</h2>
        {/* TODO: Create quiz preview */}
        <div>Quiz preview</div>
      </div>
		</PageContainer>
	);
}
