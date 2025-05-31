import express from 'express'

import * as preciosController from '../controllers/precios.controller'

const router = express.Router()

// Post

router.post('/', preciosController.postPrice)


// Get`s

router.get('/', preciosController.getAllPrices)

router.get("/:id", preciosController.getPriceById)

// Update

router.put("/:id", preciosController.updatePrice)

// Disable / Enable

router.patch('/:id', preciosController.patchPrice)

export default router