const { Router } = require('express')
const JsonDB = require('node-json-db')
const { json } = require('body-parser')

const router = new Router()
var db = new JsonDB("myDataBase", true, false)

router.get('/get', (req, res) => {
  const { path } = req.query
  try {
    res.json({
      data: db.getData(path),
    })
  } catch (eror) {
    res.json({
      error,
    })
  }

})

router.get('/remove', (req, res) => {
  const { path } = req.query
  try {
    db.delete(path)
    res.json({
      data: db.getData('/'),
    })
  } catch (eror) {
    res.json({
      error,
    })
  }
})


router.use(json())

router.post('/push', (req, res) => {
  const { path } = req.query
  try {
    db.push(path, req.body)
    res.json({
      data: db.getData('/'),
    })
  } catch (eror) {
    res.json({
      error,
    })
  }
})

module.exports = router