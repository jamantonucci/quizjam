import './styles.scss';

export default function QuizResult({ quiz, result }) {
	return (
		<div className='quizResult'>
			<h1>{quiz.title}</h1>
			<h2>Your Result: {result.title}</h2>
			<div>{result.desc}</div>
		</div>
	);
}
