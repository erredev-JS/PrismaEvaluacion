import express from 'express'

import * as productosController from '../controllers/productos.controller'

const router = express.Router()


// Get`s

router.get('/', productosController.getAllProducts)

router.get("/:id", productosController.getProductById)

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

router.post('/', productosController.postProduct)


// Update

router.put("/:id", productosController.updateProduct)

// Disable / Enable

router.patch('/:id', productosController.patchProduct)

export default router