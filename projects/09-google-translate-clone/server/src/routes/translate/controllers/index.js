const { TranslateService } = require('../services/TranslateService')
const createHttpError = require('http-errors')

module.exports = {
  detectLanguage: async (req, res, next) => {
    const { fromLanguage, toLanguage, fromText } = req.body

    try {
      const result = await TranslateService.detectLanguage({ fromLanguage, toLanguage, fromText })

      if (!result) {
        const httpError = createHttpError('Error in detect language')
        next(httpError)
      }

      return res.status(200).json(result)
    } catch (error) {
      return res.status(500)
    }
  },
  translateLanguage: async (req, res, next) => {
    const { fromLanguage, toLanguage, fromText } = req.body
    try {
      const result = await TranslateService.translateLanguage({ fromLanguage, toLanguage, fromText })

      if (!result) {
        const httpError = createHttpError('Error in translate language')
        next(httpError)
      }

      return res.status(200).json(result)
    } catch (error) {
      return res.status(500)
    }
  }
}
