import express from 'express'
import * as sizeController from '../controllers/talla.controller'

const router = express.Router()

// getAll

router.get('/', sizeController.getAllSizes)

// getById
router.get('/:id', sizeController.getSizesById)

// post
router.post('/', sizeController.createSize)

//put
router.put('/:id', sizeController.updateSize)

// patch
router.patch('/:id', sizeController.patchSize)

export default router
