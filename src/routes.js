import { Router } from 'express'
import { fillForm }, { queryForm }, { queryVersions }, { editVersions } from './database'


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

routes.get('/api/form', (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn
  }
  
  queryForm(req.body, profile, (err, result) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(result)
    }
  })
})

routes.get('/api/versions', (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn
  }
  
  queryVersions(req.body, profile, (err, result) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(result)
    }
  })
})

routes.post('/api/versions', (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn
  }
  
  editVersions(req.body, profile, (err, result) => {
    if (err) { res.status(404).send(err) } else result.type === 'error' ? res.status(404).send(result) : res.status(200).send(result)
  })
})

export default routes
