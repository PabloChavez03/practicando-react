import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Card, Stack, Typography } from '@mui/material'
import { useQuestionsResponse } from './hooks/useQuestionsResponse'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsResponse()

  return (
    <Card variant='outlined' sx={{ p: 2, backgroundColor: '#222', marginTop: 2 }}>
      <Stack direction='row' justifyContent='space-around'>
        <Stack direction='row' alignItems='center'>
          <CheckCircleOutlinedIcon color='success' />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>{correct} correctas</Typography>
        </Stack>
        <Stack direction='row' alignItems='center'>
          <HighlightOffOutlinedIcon color='error' />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>{incorrect} incorrectas</Typography>
        </Stack>
        <Stack direction='row' alignItems='center'>
          <InfoOutlinedIcon color='info' />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>{unanswered} sin responder</Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
