import { collection, addDoc, getDocs } from 'firebase/firestore';
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

async function GetQuizzesFromDb() {
  try {
    const querySnapshot = await getDocs(collection(db, 'quizzes'));
    return processQuerySnapshot(querySnapshot);

  } catch (error) {
    console.error('Error loading quizzes:', error);
  }
}

function processQuerySnapshot(querySnapshot) {
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id
    });
  });
  return data;
}

export { SaveQuizToDb, GetQuizzesFromDb };