import { createSlice } from '@reduxjs/toolkit';

const testQuiz = {
  title: 'What colour are you?',
  author: 'QuizJam Official',
  // TODO: Change to user ID so usernames can be pulled dynamically
  results: [
    {
      id: 1,
      title: 'Red',
      desc: 'You are red! You are fiery and fun! I will make a better quiz later!'
    },
    {
      id: 2,
      title: 'Blue',
      desc: 'You are blue! Lorem ipsum sit dolor etc'
    },
    {
      id: 3,
      title: 'Yellow',
      desc: 'You are yellow! You are the colour of the sun and daffodills! Also my Tim Hortons breakfast sangwich'
    }
  ],
  questions: [
    {
      id: 'a',
      questionText: 'Are you more of a cat or dog person?',
      answers: [
        {
          id: 'a1',
          answerText: 'Dogs',
          associatedResult: 1
        },
        {
          id: 'a2',
          answerText: 'Cats',
          associatedResult: 0,
        },
        {
          id: 'a3',
          answerText: 'Neither/I prefer another animal',
          associatedResult: 2
        }
      ]
    },
    {
      id: 'b',
      questionText: 'What is your morning routine like?',
      answers: [
        {
          id: 'b1',
          answerText: 'I like to wake up nice and early and have a good, productive morning!',
          associatedResult: 2
        },
        {
          id: 'b2',
          answerText: 'What? Leave me alone. I\'m sleeping.',
          associatedResult: 0
        },
        {
          id: 'b3',
          answerText: 'I don\'t love mornings, but I\'ll get up.',
          associatedResult: 1
        }
      ]
    },
    {
      id: 'c',
      questionText: 'What is your favourite season?',
      answers: [
        {
          id: 'c1',
          answerText: 'Spring! Everything is finally coming alive again!',
          associatedResult: 2,
        },
        {
          id: 'c2',
          answerText: 'Summer! It\'s bright, it\'s warm, what else could you want?',
          associatedResult: 1,
        },
        {
          id: 'c3',
          answerText: 'Autumn! Things start to get a little quieter and it\'s so beautiful outside.',
          associatedResult: 0,
        },
        {
          id: 'c4',
          answerText: 'Winter! It might be cold, but at least it\'s not sweltering like the summer.',
          associatedResult: 0
        }
      ]
    },
    {
      id: 'd',
      questionText: 'What kinds of hobbies do you tend to prefer?',
      answers: [
        {
          id: 'd1',
          answerText: 'I like to hang out with friends.',
          associatedResult: 1
        },
        {
          id: 'd2',
          answerText: 'I like to do something creative, like music or art',
          associatedResult: 2,
        },
        {
          id: 'd3',
          answerText: 'I like to do something intellectual, like programming or reading non-fiction.',
          associatedResult: 0,
        },
        {
          id: 'd4',
          answerText: 'I like to do something physical, like sports or exercise.',
          associatedResult: 1
        }
      ]
    },
    {
      id: 'e',
      questionText: 'Last question! This quiz only looks at primary colours, but if you were a secondary colour, which colour would you be?',
      answers: [
        {
          id: 'e1',
          answerText: 'Orange',
          associatedResult: 2
        },
        {
          id: 'e2',
          answerText: 'Green',
          associatedResult: 1,
        },
        {
          id: 'e3',
          answerText: 'Purple',
          associatedResult: 0
        }
      ]
    }
  ]
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizzes: [],
    quiz: testQuiz,
  },
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    }
  }
})

export const { setQuizzes } = quizSlice.actions;
export default quizSlice.reducer;