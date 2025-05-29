import express from 'express'

import * as productosController from '../controllers/productos.controller'

const router = express.Router()

// Get`s

router.get('/', productosController.getAllProducts)

router.get("/:id", productosController.getProductById)

export default router