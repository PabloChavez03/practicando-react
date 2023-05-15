import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Question } from '../types'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit: number) => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()

    const questions = json.sort(() => 0.5 - Math.random()).slice(0, limit)

    set({ questions }, false, 'FETCH_QUESTIONS')
  },
  selectAnswer: (questionId: number, answerIndex: number) => {
    const { questions } = get()
    // usar el structuredClone para copiar el objeto de forma profunda
    const newQuestions: Question[] = structuredClone(questions)
    // encontramos el indice de la pregunta
    const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
    // obtenemos la info de la pregunta
    const questionInfo = newQuestions[questionIndex]
    // averiguamos si el usuario ha seleccionado la respuesta correcta
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    // confetti

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isCorrectUserAnswer) confetti()
    // cambiar la info en la copia de la preg
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }
    // actualizar el estado
    set({ questions: newQuestions }, false, 'SELECT_ANSWER')
  },
  goNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion === questions.length) return

    set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
  },
  goPrevQuestion: () => {
    const { currentQuestion } = get()
    const prevQuestion = currentQuestion - 1
    // retrocede hasta que la pregunta llega a la primera posición del array
    if (currentQuestion === 0 || prevQuestion === -1) return

    set({ currentQuestion: prevQuestion }, false, 'GO_PREV_QUESTION')
  },
  reset: () => {
    set({ questions: [], currentQuestion: 0 }, false, 'RESET_GAME')
  }
}), {
  name: 'questions'
})))
