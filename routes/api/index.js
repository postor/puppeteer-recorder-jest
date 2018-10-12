const { Router } = require('express')
const db = require('./db')
const file = require('./file')

const router = new Router()
router.use('/db',db)
router.use('/file',file)

module.exports = router;
