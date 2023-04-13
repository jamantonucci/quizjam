import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

async function SaveQuizToDb(quiz) {
  try {
    const docRef = await addDoc(collection(db, 'quizzes'), {
      title: quiz.title,
      author: quiz.author,
      results: quiz.results,
      questions: quiz.questions
    });
    console.log('Doc written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export { SaveQuizToDb };