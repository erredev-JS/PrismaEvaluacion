import express from 'express'

import * as imagenesController from '../controllers/imagenes.controller'

const router = express.Router()

// Get`s

router.get('/', imagenesController.getAllImages)

router.get("/:id", imagenesController.getImagesById)

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

router.post('/', imagenesController.postImage)



// Update

router.put("/:id", imagenesController.updateImage)

// Disable / Enable

router.patch('/:id', imagenesController.patchImage)

export default router