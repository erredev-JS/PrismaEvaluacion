import express from 'express'
import * as addressController from '../controllers/direccion.controller'

const router = express()

router.get('/', addressController.getAllAddresses)

router.get('/:id', addressController.getAdressById)


// Requiere auth en los metodos despues de esta funcion

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})



router.post('/' , addressController.createAdress)

router.put('/:id', addressController.updateAdress)

router.patch('/:id', addressController.patchAdress)


export default router