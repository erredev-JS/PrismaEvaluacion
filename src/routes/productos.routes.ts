import express from 'express'

import * as productosController from '../controllers/productos.controller'

const router = express.Router()

// Post

router.post('/', productosController.postProduct)


// Get`s

router.get('/', productosController.getAllProducts)

router.get("/:id", productosController.getProductById)

// Update

router.put("/:id", productosController.updateProduct)

// Disable / Enable

router.patch('/:id', productosController.patchProduct)

export default router