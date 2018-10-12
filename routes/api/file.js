const { sep, join } = require('path')
const { Router } = require('express')
const { exists, writeFile } = require('fs-extra')
const { json } = require('body-parser')

const router = new Router()


router.get('/exists', async (req, res) => {
  res.json({
    exists: await exists(getFullPath(req.query.path)),
  })
})

router.use(json())
router.put('/', async (req, res) => {
  const { file, content } = req.body
  const fullPath = getFullPath(file)
  try {
    await writeFile(fullPath, content)
    res.json({ file: fullPath })
  } catch (error) {
    res.json({
      error,
    })
  }
})

function getFullPath(path) {
  return join(__dirname, '..', '..', path.replace(/\//g, sep))
}

module.exports = router