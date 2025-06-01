import express from 'express'
import * as localityController from '../controllers/localidad.controller'

const router = express()

router.get('/', localityController.getAllLocalities)

router.get('/:id', localityController.getLocalityById)

// Requiere auth en los metodos despues de esta funcion

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})



router.post('/' , localityController.createLocality)

router.put('/:id', localityController.updateLocality)

router.patch('/:id', localityController.patchLocality)


export default router