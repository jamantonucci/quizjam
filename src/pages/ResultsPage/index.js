import PageContainer from "../../components/PageContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ResultsPage() {
  const params = useParams();
  const quizID = useSelector((state) => state.user.quizInProgress);
  const quiz = useSelector((state) => state.quiz.quizzes.find((quiz => quiz.id === quizID)));
  const results = quiz.results;
  const result = results.find((result => result.id === params.id));
  
  return (
    <PageContainer>
      <h1>{quiz.title}</h1>
      <h2>Your Result: {result.title}</h2>
      <div>{result.desc}</div>
      <Link to={'/quiz/' + quizID}>Retake Quiz</Link>
      <Link to='/'>Back to Home</Link>
    </PageContainer>
  )
}