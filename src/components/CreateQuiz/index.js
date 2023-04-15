import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import ValidateNewQuiz from './validate';
import * as database from '../../database';
import './styles.scss';
import { useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router';

export default function CreateQuiz() {
	const user = database.GetCurrentUserInfo();
	const [title, setTitle] = useState('');
	const [results, setResults] = useState([
		{
			id: uuid(),
			title: '',
			desc: '',
		},
		{
			id: uuid(),
			title: '',
			desc: '',
		},
	]);
	const [questions, setQuestions] = useState([
		{
			id: uuid(),
			questionText: '',
			answers: [
				{
					id: uuid(),
					answerText: '',
					associatedResult: -1,
				},
				{
					id: uuid(),
					answerText: '',
					associatedResult: -1,
				},
			],
		},
		{
			id: uuid(),
			questionText: '',
			answers: [
				{
					id: uuid(),
					answerText: '',
					associatedResult: -1,
				},
				{
					id: uuid(),
					answerText: '',
					associatedResult: -1,
				},
			],
		},
	]);
	const [validate, setValidate] = useState({
		titleLength: false,
		minimumResults: false,
		resultsCompleted: false,
		minimumQuestions: false,
		questionLength: false,
		minimumAnswers: false,
		resultsAssociated: false,
	});
	const [quizComplete, setQuizComplete] = useState(false);
	const [quizIsSaving, setQuizIsSaving] = useState(false);
	const navigate = useNavigate();

	const [quiz, setQuiz] = useState({
		id: uuid(),
		title,
		author: user.id,
		results,
		questions,
	});


	// Runs function to validate quiz every time there is a change to
	// title, results or questions.
	useEffect(() => {
		let newQuiz = { ...quiz };

		newQuiz = {
			id: quiz.id,
			author: user.id,
			title,
			results,
			questions,
		};

		setQuiz((prevState) => {
			if (prevState !== newQuiz) {
				return { ...prevState, ...newQuiz };
			} else {
				return prevState;
			}
		});

		const newValidate = ValidateNewQuiz(newQuiz);

		setValidate((prevState) => {
			if (prevState !== newValidate) {
				return { ...prevState, ...newValidate };
			} else {
				return prevState;
			}
		});
	// eslint-disable-next-line
	}, [title, results, questions]);

	// Checks to see if quiz is completely valid every time there is a
	// change to the 'validate' state variable.
	useEffect(() => {
		if (
			validate.minimumAnswers === true &&
			validate.minimumQuestions === true &&
			validate.minimumResults === true &&
			validate.questionLength === true &&
			validate.resultsAssociated === true &&
			validate.resultsCompleted === true &&
			validate.titleLength === true
		) {
			setQuizComplete(true);
		} else {
			setQuizComplete(false);
		}
	}, [validate]);

	// HANDLING FORM SUBMISSION
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setQuizIsSaving(true);

		const savedQuizId = await database.SaveQuizToDb(quiz);
		console.log(savedQuizId);
		setQuizIsSaving(false);
		navigate('/');

	};

	// FUNCTIONS FOR HANDLING RESULTS
	const handleAddResult = (event) => {
		event.preventDefault();
		const newResult = { id: uuid(), title: '', desc: '' };
		setResults((current) => [...current, newResult]);
	};

	const handleDeleteResult = (event, id) => {
		event.preventDefault();
		const newResults = results.filter((result) => result.id !== id);
		setResults(newResults);
	};

	// FUNCTIONS FOR HANDLING QUESTIONS
	const handleAddQuestion = (event) => {
		event.preventDefault();
		const newQuestion = {
			questionText: '',
			answers: [
				{
					id: uuid(),
					answerText: '',
					associatedResult: -1,
				},
				{
					answerText: '',
					associatedResult: -1,
				},
			],
		};
		setQuestions((current) => [...current, newQuestion]);
	};

	const handleDeleteQuestion = (event, id) => {
		event.preventDefault();
		const newQuestions = questions.filter((question) => question.id !== id);
		setQuestions(newQuestions);
	};

	// FUNCTIONS FOR HANDLING ANSWERS
	const handleAddAnswer = (event, questionIndex) => {
		event.preventDefault();
		const newAnswer = { id: uuid(), answerText: '', associatedResult: -1 };
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers.push(newAnswer);
		setQuestions(newQuestions);
	};

	const handleDeleteAnswer = (event, questionIndex, id) => {
		event.preventDefault();
		let newQuestions = [...questions];
		let newAnswers = newQuestions[questionIndex].answers.filter(
			(answer) => answer.id !== id
		);
		newQuestions[questionIndex].answers = newAnswers;
		setQuestions(newQuestions);
	};

	return (
		<div className='createQuizComponent'>
			<h1>Create New Quiz</h1>

			{/* BASIC INFO */}
			<form onSubmit={handleFormSubmit}>
				<h2 className='h2bar'>Basic Info</h2>
				<div>
					<label>
						Title:
						<input
							type='text'
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							value={title}
							maxLength={255}
							placeholder='What colour are you?'
							// required={true}
						/>
					</label>
					<label>
						Author:
						<p>{useSelector((state) => state.user.username)}</p>
					</label>
				</div>

				{/* RESULT INPUT */}
				<h2 className='h2bar'>Possible Results</h2>
				<p>Your quiz needs at least two results.</p>
				<div>
					{results.map((result, index) => (
						<div key={index} className='result'>
							<h3>
								Result {index + 1}
								<TiDelete
									onClick={(event) => handleDeleteResult(event, result.id)}
								/>
							</h3>

							{/* Result Title Input */}
							<label>
								Title:
								<input
									type='text'
									onChange={(e) => {
										const newResults = results.map((item, i) => {
											if (index === i) {
												return { ...item, title: e.target.value };
											} else {
												return item;
											}
										});
										setResults(newResults);
									}}
									value={result.title}
									maxLength={255}
									// required={true}
									placeholder='Red'
								/>
							</label>

							{/* Result Description Input */}
							<label>
								Description:
								<input
									type='text'
									onChange={(e) => {
										const newResults = results.map((item, i) => {
											if (index === i) {
												return { ...item, desc: e.target.value };
											} else {
												return item;
											}
										});
										setResults(newResults);
									}}
									value={result.desc}
									maxLength={1024}
									// required={true}
									placeholder='You are red because...'
								/>
							</label>
						</div>
					))}
					{/* New Result Button */}
					<button onClick={handleAddResult}>Add Result</button>
				</div>

				{/* QUESTION INPUT */}
				<h2 className='h2bar'>Questions</h2>
				<p>Your quiz needs at least two questions.</p>
				<div>
					{questions.map((question, questionIndex) => (
						<div key={questionIndex} className='question'>
							<h3>
								Question {questionIndex + 1}{' '}
								<TiDelete
									onClick={(event) => handleDeleteQuestion(event, question.id)}
								/>
							</h3>

							{/* Question Text Input */}
							<label>
								Question:
								<input
									type='text'
									onChange={(e) => {
										const newQuestions = questions.map((item, i) => {
											if (questionIndex === i) {
												return { ...item, questionText: e.target.value };
											} else {
												return item;
											}
										});
										setQuestions(newQuestions);
									}}
									value={question.questionText}
									maxLength={1024}
									placeholder='What is your favourite colour?'
								/>
							</label>

							{/* Answer Input */}
							<div>
								{question.answers.map((answer, index) => (
									<div key={index} className='answer'>
										<h4>
											Answer {index + 1}{' '}
											<TiDelete
												onClick={(event) =>
													handleDeleteAnswer(event, questionIndex, answer.id)
												}
											/>
										</h4>
										<label>
											Answer:
											<input
												type='text'
												onChange={(e) => {
													const newQuestions = [...questions];
													newQuestions[questionIndex].answers[
														index
													].answerText = e.target.value;
													setQuestions(newQuestions);
												}}
												value={answer.answerText}
												maxLength={1024}
												placeholder='Blue'
											/>
										</label>
										<label>
											Associated Result:
											<select
												value={answer.associatedResult}
												onChange={(e) => {
													const newQuestions = [...questions];
													newQuestions[questionIndex].answers[
														index
													].associatedResult = e.target.value;
													setQuestions(newQuestions);
												}}
											>
												<option value=''>Choose Result...</option>
												{results.map((result) => (
													<option value={result.id} key={result.id}>
														{result.title}
													</option>
												))}
											</select>
										</label>
									</div>
								))}
							</div>
							{/* New Answer Button */}
							<button
								onClick={(event) => handleAddAnswer(event, questionIndex)}
							>
								Add New Answer
							</button>
						</div>
					))}

					{/* New Question Button */}
					<button onClick={handleAddQuestion}>Add Question</button>
					<div className='quizRequirements'>
						<h2>Quiz Requirements</h2>
						<ul>
							<li className={'requirement-' + validate.titleLength}>
								{validate.titleLength ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								Title is at least 5 characters long.
							</li>
							<li className={'requirement-' + validate.minimumResults}>
								{validate.minimumResults ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								There are at least two results.
							</li>
							<li className={'requirement-' + validate.resultsCompleted}>
								{validate.resultsCompleted ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								Each result has a title and description.
							</li>
							<li className={'requirement-' + validate.minimumQuestions}>
								{validate.minimumQuestions ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								There are at least two questions.
							</li>
							<li className={'requirement-' + validate.questionLength}>
								{validate.questionLength ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								Every question is at least 5 characters long.
							</li>
							<li className={'requirement-' + validate.minimumAnswers}>
								{validate.minimumAnswers ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								Each question has at least 1 answer.
							</li>
							<li className={'requirement-' + validate.resultsAssociated}>
								{validate.resultsAssociated ? (
									<IoCheckmarkCircle />
								) : (
									<MdError />
								)}
								Each answer has an associated result.
							</li>
						</ul>
					</div>
					<button
						type='submit'
						className='full-width-button'
						disabled={!quizComplete}
					>
						{quizIsSaving ? ('Saving...') : ('Create')}
					</button>
				</div>
			</form>
		</div>
	);
}
