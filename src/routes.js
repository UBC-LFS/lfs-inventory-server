import { Router } from 'express'
import { fillForm, queryForm, queryVersions, editVersions } from './database'


var multer = require('multer')
var upload = multer()
const routes = Router()

routes.post('/form', upload.array(), (req, res) => {
  const ts = new Date().toJSON()
  const date = time.slice(0, 10).replace(/-/g, '-')
  const time = time.slice(11, 19)
  const profile = {
    cwl: req.headers.cwlloginname,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn,
    timeStamp: ts,
    userTime: time,
    userDate: date
  }
  fillForm(req.body, profile, (err, result) => {
    if (err) { res.status(404).send(err) } else result.type === 'error' ? res.status(404).send(result) : res.status(200).send(result)
  })
})

routes.get('/search', (req, res) => {
  getSearchTerms((err, result) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(result)
    }
  })
})

routes.get('/search/:searchfield:searchterm', (req, res) => {
  const searchField = req.params.searchfield
	const searchTerm = req.params.searchterm
	console.log('/search/:searchfield:searchterm: ' + searchTerm + 'for' + searchTerm)
	queryForm(searchField, searchTerm, (err, result) => {
	  if (err) {
	    res.status(404).send(err)
	  } else {
	    res.status(200).send(result)
	  }
	})
})

routes.get('/search/version?:entryid', (req, res) => {
  const entryID = req.params.entryid
  console.log('/search/version?:entryid : ' + entryID)
 	queryVersions(entryID, (err, result) => {
	  if (err) {
	    res.status(404).send(err)
	  } else {
	    res.status(200).send(result)
	  }
	})
})

routes.post('/update', (req, res) => {
  const ts = new Date().toJSON()
  const date = time.slice(0, 10).replace(/-/g, '-')
  const time = time.slice(11, 19)
  const profile = {
    cwl: req.headers.cwlloginname,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn,
    timeStamp: ts,
    userTime: time,
    userDate: date
  }
  
  editVersions(req.body, profile, (err, result) => {
    if (err) { res.status(404).send(err) } else result.type === 'error' ? res.status(404).send(result) : res.status(200).send(result)
  })
})


export default routes
