import './styles.scss';

export default function QuizResult({ quiz, result }) {
	return (
		<>
			<h1>{quiz.title}</h1>
			<div className='quizResult'>
				<h2>Your Result: {result.title}</h2>
				<div>{result.desc}</div>
			</div>
		</>
	);
}
