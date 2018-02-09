import { Router } from 'express'

const routes = Router()

routes.post('/api/form', (req, res) => {
  console.log(req)
})

export default routes
