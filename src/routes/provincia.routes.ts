import express from 'express'
import * as provinciaController from '../controllers/provincia.controller'

const router = express.Router()

// getAll

router.get('/', provinciaController.getAllProvinces)

// getById
router.get('/:id', provinciaController.getProvinceById)

// post
router.post('/', provinciaController.createProvince)

//put
router.put('/:id', provinciaController.updateProvince)

// patch
router.patch('/:id', provinciaController.patchProvince)

export default router
