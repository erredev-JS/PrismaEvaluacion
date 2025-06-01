import {Router} from 'express'

import * as facturasController from '../controllers/facturas.controller'

const router = Router()

// Get`s

router.get('/', facturasController.getAllBills)

router.get("/:id", facturasController.getBillById)

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

router.post('/', facturasController.postBill)



// Update

router.put("/:id", facturasController.updateBill)

// Disable / Enable

router.patch('/:id', facturasController.patchBill)

export default router