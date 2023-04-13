export default function ValidateNewQuiz(quiz) {
  const validate = [];

  // VALIDATE BASIC INFO
  if (quiz.title.length < 5) {
    validate.push('Your quiz title must be at least 5 characters long.');
  }

  // VALIDATE RESULTS
  if (quiz.results.length < 2) {
    validate.push('Your quiz must have at least two results.');
  }

  quiz.results.forEach((result) => {
    if (result.title === '' || result.desc === '') {
      validate.push('Results need both a title and a description.');
    }
  })

  // VALIDATE QUESTIONS
  if (quiz.questions.length < 2) {
    validate.push('Your quiz must have at least two questions.');
  }

  // Looping through each question
  quiz.questions.forEach((question) => {
    
    // Validate question legnth
    if (question.questionText.length < 5) {
      validate.push('Each question must be at least 5 characters long.')
    }

    // Need at least 2 answers per question
    if (question.answers.length < 2) {
      validate.push('Each question must have at least two answers.');
    }

    // Answers must be at least 5 characters long.
    question.answers.forEach((answer) => {
      if (answer.length < 5) {
        validate.push('Each answer must be at least 5 characters long.');
      }

    })
  })

  return validate;
}