import { Router } from 'express'
import { fillForm } from './database'

const routes = Router()

routes.post('/api/form', (req, res) => {
  console.log('THIS IS THE REQUEST ' + req)
  console.log('THIS IS THE BODY ' + req.body)
  console.log('THIS IS THE DATA ' + `${req.body.id}`)
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
