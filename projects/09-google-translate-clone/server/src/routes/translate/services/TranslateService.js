const cohere = require('cohere-ai')
const { config } = require('dotenv')
config()

cohere.init(process.env.COHERE_API_KEY)

class TranslateService {
  static translateLanguage = async ({ fromLanguage, toLanguage, fromText }) => {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: `Translate the following from ${fromLanguage} to ${toLanguage}: ${fromText}`,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    })
    return response.body.generations[0].text.substring(1)
  }

  static detectLanguage = async ({ fromLanguage = 'auto', toLanguage, fromText }) => {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: `Detect the language of the prompt and translate it into ${toLanguage}: ${fromText}`,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    })
    return response.body.generations[0].text.substring(1)
  }
}

module.exports = {
  TranslateService
}
