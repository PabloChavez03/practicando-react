const cohere = require('cohere-ai')
const { config } = require('dotenv')
config()

cohere.init(process.env.COHERE_API_KEY)

class TranslateService {
  static translateLanguage = async ({ fromLanguage, toLanguage, fromText }) => {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: `Generate a translator model that can translate full phrases and sentences from one language to another. The model should be capable of translating and detecting between all major languages, such as English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and other important languages. The model should produce accurate and fluent translations and be able to handle the syntax and grammar of both the source and target languages.
      ---
      Translate to English: "Me gusta la musica"
      Translated into English: "I like music"
      ---
      Translate to Spanish: "Me gusta la musica"
      Translated into Deutsch:  "Ich mag Musik"
      ---
      Translate to English: "I like music"
      Translated into Deutsch: "Ich mag Musik"
      ---
      Translate to Deutsch: "Ich mag Musik"
      Translated into Spanish: "Me gusta la musica"
      ---
      Translate to Spanish: "Hola, me llamo Pablo"
      Translated into Deutsch: "Hallo, mein Name ist Pablo"
      ---
      Translate to English: "Hello, My name is Pablo"
      Translated into Deutsch: "Hallo, mein Name ist Pablo"
      ---
      Translate to Spanish: "El servicio de Google, que se ofrece sin coste económico, traduce al instante palabras, frases y páginas web a más de 100 idiomas"
      Translated into English: "Offered free of charge, Google's service instantly translates words, phrases and web pages into more than 100 languages"
      ---
      Translate to English: "Offered free of charge, Google's service instantly translates words, phrases and web pages into more than 100 languages"
      Translated into Deutsch: "Der kostenlose Dienst von Google übersetzt Wörter, Sätze und Webseiten sofort in mehr als 100 Sprachen"
      ---
      Translate to English: "I often hear people claim that they can hear one or two opinions a person has and from that they pretty much have them all figured out. I don’t know how reliable that ability really is, I would like to think that expressing some of my opinions doesn’t suddenly expose me as an open book to everyone around me. One thing that is for sure though is that, if you were to take a peek at my Udemy course history (and completion rate) you would know exactly who I am, or at least who I was. You would be contemplating a graveyard of mostly unfinished (if even started in the first place) courses that are just sitting there gathering dust"
      Translated into Deutsch: "Ich höre oft, dass Leute behaupten, dass sie ein oder zwei Meinungen einer Person hören können und dass sie sie so ziemlich alle herausgefunden haben. Ich weiß nicht, wie zuverlässig diese Fähigkeit wirklich ist, ich würde gerne glauben, dass das Äußern einiger meiner Meinungen mich nicht plötzlich als offenes Buch für alle um mich herum aussetzt. Eines ist jedoch sicher: Wenn Sie einen Blick auf meinen Udemy-Kursverlauf (und die Abschlussquote) werfen würden, wüssten Sie genau, wer ich bin oder zumindest wer ich war. Sie würden einen Friedhof von größtenteils unfertigen (wenn überhaupt begonnenen) Kursen in Betracht ziehen, die nur da sitzen und Staub ansammeln"
      ---
      Translate to English: "I often hear people claim that they can hear one or two opinions a person has and from that they pretty much have them all figured out. I don’t know how reliable that ability really is, I would like to think that expressing some of my opinions doesn’t suddenly expose me as an open book to everyone around me. One thing that is for sure though is that, if you were to take a peek at my Udemy course history (and completion rate) you would know exactly who I am, or at least who I was. You would be contemplating a graveyard of mostly unfinished (if even started in the first place) courses that are just sitting there gathering dust"
      Translated into Spanish: "A menudo escucho a las personas afirmar que pueden escuchar una o dos opiniones que tiene una persona y, a partir de eso, prácticamente las tienen todas resueltas. No sé qué tan confiable es realmente esa habilidad, me gustaría pensar que expresar algunas de mis opiniones no me expone repentinamente como un libro abierto a todos los que me rodean. Sin embargo, una cosa que es segura es que, si echaras un vistazo a mi historial de cursos de Udemy (y la tasa de finalización), sabrías exactamente quién soy, o al menos quién era. Estaría contemplando un cementerio de cursos en su mayoría sin terminar (si es que incluso comenzaron) que simplemente están sentados allí acumulando polvo"
      ---
      Translate to Spanish: "A menudo escucho a las personas afirmar que pueden escuchar una o dos opiniones que tiene una persona y, a partir de eso, prácticamente las tienen todas resueltas. No sé qué tan confiable es realmente esa habilidad, me gustaría pensar que expresar algunas de mis opiniones no me expone repentinamente como un libro abierto a todos los que me rodean. Sin embargo, una cosa que es segura es que, si echaras un vistazo a mi historial de cursos de Udemy (y la tasa de finalización), sabrías exactamente quién soy, o al menos quién era. Estaría contemplando un cementerio de cursos en su mayoría sin terminar (si es que incluso comenzaron) que simplemente están sentados allí acumulando polvo"
      Translated into Deutsch: "Ich höre oft, dass Leute behaupten, dass sie ein oder zwei Meinungen einer Person hören können und dass sie sie so ziemlich alle herausgefunden haben. Ich weiß nicht, wie zuverlässig diese Fähigkeit wirklich ist, ich würde gerne glauben, dass das Äußern einiger meiner Meinungen mich nicht plötzlich als offenes Buch für alle um mich herum aussetzt. Eines ist jedoch sicher: Wenn Sie einen Blick auf meinen Udemy-Kursverlauf (und die Abschlussquote) werfen würden, wüssten Sie genau, wer ich bin oder zumindest wer ich war. Sie würden einen Friedhof von größtenteils unfertigen (wenn überhaupt begonnenen) Kursen in Betracht ziehen, die nur da sitzen und Staub ansammeln"
      ---
      Translate to ${fromLanguage}: "${fromText}"
      Translated into ${toLanguage}:`,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      stop_sequences: ['---'],
      return_likelihoods: 'NONE'
    })
    return response.body.generations[0].text.replace('\\', '').replace('---', '').replaceAll('"', '').trim()
  }

  static detectLanguage = async ({ fromLanguage = 'auto', toLanguage, fromText }) => {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: `Generate a translator model that can translate full phrases and sentences from one language to another. The model should be capable of translating and detecting between all major languages, such as English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and other important languages. The model should produce accurate and fluent translations and be able to handle the syntax and grammar of both the source and target languages.
      ---
      Translate to ${toLanguage}: ${fromText}`,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    })
    return response.body.generations[0].text.replace('\\', '').replace('---', '').replaceAll('"', '').trim()
  }
}

module.exports = {
  TranslateService
}
