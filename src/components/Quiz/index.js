import * as database from '../../database';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuizInProgress } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

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
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setAuthorDisplayName(await database.GetDisplayNameFromId(author));
			setIsLoading(false);
		})();

		const quizAnswers = [];

		questions.forEach((question, index) => {
			quizAnswers.push(-1);
		});

		setQuizInProgress(quizAnswers);

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

	const handleAnswerChange = (event) => {

		// find q c provided index
		const currentQuestionIndex = event.target.id;
		const selectedAnswer = event.target.value;

		// update?
		const newAnswers = [...quizInProgress];
		newAnswers[currentQuestionIndex] = selectedAnswer;
		setQuizInProgress(newAnswers);
		console.log(quizInProgress);

	};

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
      }) 
    })
    console.log(quizResults);
    const result = quizResults.reduce(function(prev, current) {
      return (prev.score > current.score) ? prev : current
    })
		dispatch(updateQuizInProgress(id));
    console.log(result);

		navigate('/quiz/result/' + result.id);
  };

	return (
		<div>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<>
					<h1 className='barh1'>{title}</h1>
					<div>Created By: {authorDisplayName}</div>
					{/* Create the quiz questions with the Array.map() and loop over them */}
					{questions.map((question, i) => (
						<div key={'q' + i}>
							<h2>
								Q{i + 1}. {question.questionText}
							</h2>

							{question.answers.map((answer, index) => (
								<div key={'a' + answer.id}>
									{/* Display an radio button and label for each answer of the question */}
									<input
										type='radio'
										id={i}
										value={index}
										key={answer.id}
										onChange={(e) => handleAnswerChange(e)}
                    // eslint-disable-next-line
                    checked={quizInProgress[i] == index}
									/>
									<label htmlFor={answer.id} key={index}>
										{answer.answerText}
									</label>
								</div>
							))}
						</div>
					))}
					<button type='submit' onClick={handleSubmitQuiz}>
						Submit
					</button>
				</>
			)}
		</div>
	);
}
