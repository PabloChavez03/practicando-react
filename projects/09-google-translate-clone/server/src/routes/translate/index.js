const router = require('express').Router()
const { detectLanguage, translateLanguage } = require('./controllers')

router.post('/auto', detectLanguage)
router.post('/translate', translateLanguage)

module.exports = router
