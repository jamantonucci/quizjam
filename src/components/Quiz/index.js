import { useSelector } from 'react-redux';

// Keiran - Make your thing here. You can test it by appending
// /quiz/test to your URL - eg. localhost:3000/quiz/test
// I have the routes set up to display this component there.

// You can find the test data in src > redux > quizSlice.js.
// But I have already called it here for you. It is stored in the variable 'quiz'

export default function QuizComponent() {
  const quiz = useSelector((state) => state.quiz.quiz);
  console.log(quiz);

  return (
    <div>Quiz</div>
  )
}