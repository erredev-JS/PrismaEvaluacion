import express from 'express'
import * as sizeController from '../controllers/talla.controller'

const router = express.Router()

// getAll

router.get('/', sizeController.getAllSizes)

// getById
router.get('/:id', sizeController.getSizesById)

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
router.post('/', sizeController.createSize)

//put
router.put('/:id', sizeController.updateSize)

// patch
router.patch('/:id', sizeController.patchSize)

export default router
