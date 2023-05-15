import { Button, Card, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import SyntaxReactHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Footer } from './Footer'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'

  if (index !== correctAnswer && userSelectedAnswer !== index) return 'transparent'

  if (index === correctAnswer) return 'green'

  if (index === userSelectedAnswer) return 'red'

  return 'transparent'
}

export const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', p: 2, backgroundColor: '#222', marginTop: 4 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxReactHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxReactHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton disabled={info.userSelectedAnswer != null} sx={{ backgroundColor: getBackgroundColor(info, index) }} onClick={createHandleClick(index)}>
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Button disabled={currentQuestion === 0} onClick={goPrevQuestion} variant='contained' sx={{ mt: 2 }}>Previous</Button>
        <Typography variant='subtitle1' sx={{ mt: 2 }}>{currentQuestion + 1} / {questions.length}</Typography>
        <Button onClick={goNextQuestion} variant='contained' sx={{ mt: 2 }}>Next</Button>
      </Stack>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const reset = useQuestionsStore(state => state.reset)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
      <Footer />

      <Button variant='outlined' sx={{ mt: 2 }} onClick={() => reset()}>Resetear juego</Button>
    </>
  )
}
