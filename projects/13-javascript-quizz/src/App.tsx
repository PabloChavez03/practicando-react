import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { Game } from './Game'
import { Start } from './Start'
import { JavaScriptLogo } from './assets/icons/Icons'
import { useQuestionsStore } from './store/questions'

function App () {
  const questions = useQuestionsStore(state => state.questions)

  console.log(questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      </Container>
    </main>
  )
}

export default App
