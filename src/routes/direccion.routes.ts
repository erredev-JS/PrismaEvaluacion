import express from 'express'
import * as addressController from '../controllers/direccion.controller'

const router = express()

router.get('/', addressController.getAllAddresses)

router.get('/:id', addressController.getAdressById)

router.post('/' , addressController.createAdress)

router.put('/:id', addressController.updateAdress)

router.patch('/:id', addressController.patchAdress)


export default router