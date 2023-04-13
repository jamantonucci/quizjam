import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import QuizComponent from "../../components/Quiz";
import { useSelector } from "react-redux";

export default function QuizPage() {
  const params = useParams();
  const quiz = useSelector((state) => state.quiz.quizzes.find((quiz => quiz.id === params.id)))


  return (
    <PageContainer>
      <QuizComponent {...quiz} />
    </PageContainer>
  )
}