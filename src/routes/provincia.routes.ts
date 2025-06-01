import express from 'express'
import * as provinciaController from '../controllers/provincia.controller'

const router = express.Router()

// getAll

router.get('/', provinciaController.getAllProvinces)

// getById
router.get('/:id', provinciaController.getProvinceById)

// Requiere auth en los metodos despues de esta funcion

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})


// post
router.post('/', provinciaController.createProvince)

//put
router.put('/:id', provinciaController.updateProvince)

// patch
router.patch('/:id', provinciaController.patchProvince)

export default router
