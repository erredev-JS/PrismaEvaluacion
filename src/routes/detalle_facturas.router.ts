import {Router} from 'express'

import * as detalleFacturasController from '../controllers/detalle_facturas.controller'

const router = Router()

// Get`s

router.get('/', detalleFacturasController.getAllDetalleFacturas)

router.get("/:id", detalleFacturasController.getDetalleFacturaById)

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

router.post('/', detalleFacturasController.postDetalleFactura)



// Update

router.put("/:id", detalleFacturasController.updateDetalleFactura)

// Disable / Enable

router.patch('/:id', detalleFacturasController.patchDetalleFactura)

export default router