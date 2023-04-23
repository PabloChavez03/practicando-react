const router = require('express').Router()
const translate = require('./translate')

router.use('/translator', translate)

module.exports = router
