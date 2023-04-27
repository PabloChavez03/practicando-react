import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './types/enum'
import TextArea from './components/TextArea'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { translate } from './services/translate'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const app = "app"

  const debouncedFromText = useDebounce(fromText, 500)

  useEffect(() => {
    translate({ fromLanguage, toLanguage, fromText: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(console.error)
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  // const handleSpeak = () => {
  //   console.log(result)
  //   const utterance = new SpeechSynthesisUtterance(result)
  //   utterance.lang = 'es-MX'
  //   utterance.rate = 0.75
  //   speechSynthesis.speak(utterance)
  // }

  return (
    <Container fluid>
      <h2>Google Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => {
              interchangeLanguages()
            }}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                value={result}
                onChange={setResult}
                loading={loading}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
              <Button
                style={{ opacity: .7 }}
                variant='link'
                onClick={handleClipboard}
                >
                  <ClipboardIcon />
              </Button>
{/* 
              <Button
                style={{ opacity: .7 }}
                variant='link'
                onClick={handleSpeak}
                >
                  <SpeakerIcon />
              </Button> */}
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
