import { useState } from 'react';
import uuid from 'react-uuid';
import ValidateNewQuiz from './validate';
import * as database from '../../database';

export default function CreateQuiz() {
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
					associatedResult: 0,
				},
				{
					id: uuid(),
					answerText: '',
					associatedResult: 0,
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
					associatedResult: 0,
				},
				{
					id: uuid(),
					answerText: '',
					associatedResult: 0,
				},
			],
		},
	]);
	const [errorMessages, setErrorMessages] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);

	// HANDLING FORM SUBMISSION
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setShowSuccess(false);

		const user = database.GetCurrentUserInfo();

		const quiz = {
			id: uuid(),
			title,
			author: user.id,
			results,
			questions
		}

		// Validate data
		const validate = ValidateNewQuiz(quiz);
		setErrorMessages(validate);

		if (validate.length === 0) {
			await database.SaveQuizToDb(quiz);
			setShowSuccess(true);
		}

	}

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
					associatedResult: 0,
				},
				{
					answerText: '',
					associatedResult: 0,
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
		const newAnswer = { id: uuid(), answerText: '', associatedResult: 0 };
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
		<>
			<h1>Create New Quiz</h1>

			{/* CONDITIONALLY DISPLAY ERROR MESSAGES */}
			{errorMessages.length > 0 && (
				<div>Something went wrong:
					<ul>
						{errorMessages.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}

			{/* CONDITIONALLY DISPLAY SUCCESS MESSAGE */}
			{showSuccess && (
				<div>Quiz created successfully!</div>
			)}



			<form onSubmit={handleFormSubmit}>
				<h2>Basic Info</h2>
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
				</div>

				{/* RESULT INPUT */}
				<h2>Possible Results</h2>
				<p>Your quiz needs at least two results.</p>
				<div>
					{results.map((result, index) => (
						<div key={index}>
							<h3>Result {index + 1}</h3>

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
									maxLength={255}
									// required={true}
									placeholder='You are red because...'
								/>
							</label>

							{/* Delete Result Button */}
							<button onClick={(event) => handleDeleteResult(event, result.id)}>
								Delete
							</button>
						</div>
					))}
					{/* New Result Button */}
					<button onClick={handleAddResult}>Add Result</button>
				</div>

				{/* QUESTION INPUT */}
				<h2>Questions</h2>
				<p>Your quiz needs at least two questions.</p>

				<div>
					{questions.map((question, questionIndex) => (
						<div key={questionIndex}>
							<h3>Question {questionIndex + 1}</h3>

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
									<div key={index}>
										<label>
											Answer {index + 1}
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
										{/* Delete Answer Button */}
										<button
											onClick={(event) =>
												handleDeleteAnswer(event, questionIndex, answer.id)
											}
										>
											Delete Answer {index + 1}
										</button>
									</div>
								))}
							</div>
							{/* New Answer Button */}
							<button
								onClick={(event) => handleAddAnswer(event, questionIndex)}
							>
								Add New Answer
							</button>

							{/* Delete Question Button */}
							<button
								onClick={(event) => handleDeleteQuestion(event, question.id)}
							>
								Delete Question {questionIndex + 1}
							</button>
						</div>
					))}
					{/* New Question Button */}
					<button onClick={handleAddQuestion}>Add Question</button>

					<button type='submit'>Create</button>
				</div>
			</form>
		</>
	);
}
