import { Router } from 'express'
import { fillForm } from './database'

var multer = require('multer')
var upload = multer()
const routes = Router()

routes.post('/api/form', upload.array(), (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn
  }
  fillForm(req.body, profile, (err, result) => {
    if (err) { res.status(404).send(err) } else result.type === 'error' ? res.status(404).send(result) : res.status(200).send(result)
  })
})

export default routes
