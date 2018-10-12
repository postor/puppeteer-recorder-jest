const { sep, join } = require('path')
const { Router } = require('express')
const { exists } = require('fs-extra')

const router = new Router()

router.get('/exists', async (req, res) => {
  const { path } = req.query
  const fullPath = join(__dirname, '..', '..', path.replace(/\//g, sep))
  res.json({
    exists: await exists(fullPath),
  })
})

module.exports = router