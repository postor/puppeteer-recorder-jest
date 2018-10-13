const { sep, join } = require('path')
const { Router } = require('express')
const { exists, writeFile, remove } = require('fs-extra')
const { json } = require('body-parser')

const router = new Router()


router.get('/exists', async (req, res) => {
  res.json({
    exists: await exists(getFullPath(req.query.uri)),
  })
})
router.delete('/', async (req, res) => {
  try {
    await remove(req.query.uri)
    res.json({})
  } catch (error) {
    res.json({
      error,
    })
  }
})

router.use(json())
router.put('/', async (req, res) => {
  const { uri, content } = req.body
  const file = getFullPath(uri)
  try {
    await writeFile(file, content)
    res.json({ file, uri, })
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