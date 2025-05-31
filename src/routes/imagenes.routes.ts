import express from 'express'

import * as imagenesController from '../controllers/imagenes.controller'

const router = express.Router()

// Post

router.post('/', imagenesController.postImage)


// Get`s

router.get('/', imagenesController.getAllImages)

router.get("/:id", imagenesController.getImagesById)

// Update

router.put("/:id", imagenesController.updateImage)

// Disable / Enable

router.patch('/:id', imagenesController.patchImage)

export default router