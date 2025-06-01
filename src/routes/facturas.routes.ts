import {Router} from 'express'

import * as facturasController from '../controllers/facturas.controller'

const router = Router()

// Post

router.post('/', facturasController.postBill)


// Get`s

router.get('/', facturasController.getAllBills)

router.get("/:id", facturasController.getBillById)

// Update

router.put("/:id", facturasController.updateBill)

// Disable / Enable

router.patch('/:id', facturasController.patchBill)

export default router