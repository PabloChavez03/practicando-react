import { useQuestionsStore } from '../store/questions'

export function useQuestionsResponse () {
  const questions = useQuestionsStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question

    if (userSelectedAnswer == null) unanswered++
    if (userSelectedAnswer === correctAnswer) correct++
    if (userSelectedAnswer !== correctAnswer && userSelectedAnswer != null) incorrect++
  })

  return {
    correct,
    incorrect,
    unanswered
  }
}
