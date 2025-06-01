import express from 'express'

import * as categoriasController from '../controllers/categorias.controller'

const router = express.Router()

// Get`s

router.get('/', categoriasController.getAllCategories)

router.get("/:id", categoriasController.getCategoryById)

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

router.post('/', categoriasController.postCategory)



// Update

router.put("/:id", categoriasController.updateCategory)

// Disable / Enable

router.patch('/:id', categoriasController.patchCategory)

export default router