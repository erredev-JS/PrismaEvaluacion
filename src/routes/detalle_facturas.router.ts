import {Router} from 'express'

import * as detalleFacturasController from '../controllers/detalle_facturas.controller'

const router = Router()

// Post

router.post('/', detalleFacturasController.postDetalleFactura)


// Get`s

router.get('/', detalleFacturasController.getAllDetalleFacturas)

router.get("/:id", detalleFacturasController.getDetalleFacturaById)

// Update

router.put("/:id", detalleFacturasController.updateDetalleFactura)

// Disable / Enable

router.patch('/:id', detalleFacturasController.patchDetalleFactura)

export default router