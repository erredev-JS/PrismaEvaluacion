import express from 'express'

import * as preciosController from '../controllers/precios.controller'

const router = express.Router()

// Get`s

router.get('/', preciosController.getAllPrices)

router.get("/:id", preciosController.getPriceById)

// Requiere auth en los metodos despues de esta funcion

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})


// Post

router.post('/', preciosController.postPrice)


// Update

router.put("/:id", preciosController.updatePrice)

// Disable / Enable

router.patch('/:id', preciosController.patchPrice)

export default router