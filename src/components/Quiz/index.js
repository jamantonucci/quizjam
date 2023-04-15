import * as database from '../../database';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuizInProgress } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

export default function QuizComponent({
	id,
	title,
	author,
	questions,
	results,
}) {
	const [authorDisplayName, setAuthorDisplayName] = useState('');
	// eslint-disable-next-line
	const [isLoading, setIsLoading] = useState(false);
	const [quizScore, setQuizScore] = useState([]);
	const [quizInProgress, setQuizInProgress] = useState([]);
	const [questionsCompleted, setQuestionsCompleted] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// Get display name of author
		(async () => {
			setAuthorDisplayName(await database.GetDisplayNameFromId(author));
			setIsLoading(false);
		})();

		// Create array to store answers
		const quizAnswers = [];
		questions.forEach((question, index) => {
			// Avoids an error that occurs if set to null or undefined
			quizAnswers.push(-1);
		});
		setQuizInProgress(quizAnswers);

		// Create array to store results
		const resultsTally = [];
		results.forEach((result, index) => {
			resultsTally.push({
				id: result.id,
				score: 0,
			});
		});
		setQuizScore(resultsTally);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setQuestionsCompleted(countQuestionsCompleted());
		// eslint-disable-next-line
	}, [quizInProgress]);

	const handleAnswerChange = (event) => {
		// Find index of current question & selected answer
		const currentQuestionIndex = event.target.id;
		const selectedAnswer = event.target.value;

		// Update array
		const newAnswers = [...quizInProgress];
		newAnswers[currentQuestionIndex] = selectedAnswer;
		setQuizInProgress(newAnswers);
	};

	function countQuestionsCompleted() {
		let count = 0;
		quizInProgress.forEach((answer) => {
			if (answer === -1) {
				count++;
			}
		});
		return questions.length - count;
	}

	const handleSubmitQuiz = (e) => {
		e.preventDefault();

		const quizAnswers = [...quizInProgress];
		const quizResults = [...quizScore];

		quizAnswers.forEach((a, i) => {
			const associatedResult = questions[i].answers[a].associatedResult;

			quizResults.forEach((result, i) => {
				if (associatedResult === result.id) {
					result.score++;
				}
			});
		});
		const result = quizResults.reduce(function (prev, current) {
			return prev.score > current.score ? prev : current;
		});
		dispatch(updateQuizInProgress(id));

		navigate('/quiz/result/' + result.id);
	};

	const getPercentComplete = () => {
		const percent =
			((questionsCompleted / questions.length) * 100).toFixed(0) + '%';
		return percent;
	};

	return (
		<div className='quizComponent'>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<>
					<h1 className='barh1'>
						{title}
						<p className='author'>
							by {authorDisplayName}
						</p>
						<div className='progress-bar'>
							<div
								className='progress-bar-progress'
								style={{
									width: getPercentComplete(),
								}}
							></div>
						</div>
					</h1>
					{/* Create the quiz questions with the Array.map() and loop over them */}
					{questions.map((question, i) => (
						<div key={'q' + i} className='quizComponentQuestion'>
							<h2>
								Q{i + 1}. {question.questionText}
							</h2>

							{question.answers.map((answer, index) => (
								<div key={'a' + answer.id}>
									{/* Display an radio button and label for each answer of the question */}
									<label key={index} className='answer'>
										<input
											type='radio'
											id={i}
											value={index}
											key={answer.id}
											onChange={(e) => handleAnswerChange(e)}
											// eslint-disable-next-line
											checked={quizInProgress[i] == index}
										/>
										{answer.answerText}
									</label>
								</div>
							))}
						</div>
					))}
					<button
						type='submit'
						onClick={handleSubmitQuiz}
						disabled={!(questionsCompleted === questions.length)}
						className='full-width-button'
					>
						{(questionsCompleted === questions.length) && 'Score Quiz'}
						{!(questionsCompleted === questions.length) && (<span>{questions.length - questionsCompleted} question{!(questionsCompleted - questions.length === 1) && 's'} left</span>)}
					</button>
				</>
			)}
		</div>
	);
}
