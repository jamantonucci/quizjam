export default function ValidateNewQuiz(quiz) {
	const validate = {
		titleLength: true,
		minimumResults: true,
		resultsCompleted: true,
		minimumQuestions: true,
		questionLength: true,
		minimumAnswers: true,
		resultsAssociated: true,
	};

	// VALIDATE BASIC INFO
	if (quiz.title.length < 5) {
		validate.titleLength = false;
	}

	// VALIDATE RESULTS
	if (quiz.results.length === 0) {
		validate.resultsCompleted = false;
	}
	if (quiz.results.length < 2) {
		validate.minimumResults = false;
	} else {
		validate.resultsCompleted = true;
	}
	quiz.results.forEach((result) => {
		if (result.title === '' || result.desc === '') {
			validate.resultsCompleted = false;
		}
	});

	// VALIDATE QUESTIONS
	if (quiz.questions.length < 2) {
		validate.minimumQuestions = false;
		validate.minimumAnswers = false;
		validate.resultsAssociated = false;
		validate.questionLength = false;
	}

	quiz.questions.forEach((question) => {
		if (question.questionText.length < 5) {
			validate.questionLength = false;
		}

		if (question.answers.length >= 2) {
			validate.minimumAnswers = true;
			validate.resultsAssociated = true;
		}

		question.answers.forEach((answer) => {
			if (answer.associatedResult === -1) {
				validate.resultsAssociated = false;
			}
		});
	});

	return validate;
}
