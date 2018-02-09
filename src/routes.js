import { Router } from 'express'

const routes = Router()

routes.get('/api/form', (req, res) => {
  console.log(req)
})

export default routes
