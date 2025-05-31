import express from 'express'

import * as categoriasController from '../controllers/categorias.controller'

const router = express.Router()

// Post

router.post('/', categoriasController.postCategory)


// Get`s

router.get('/', categoriasController.getAllCategories)

router.get("/:id", categoriasController.getCategoryById)

// Update

router.put("/:id", categoriasController.updateCategory)

// Disable / Enable

router.patch('/:id', categoriasController.patchCategory)

export default router