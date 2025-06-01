import { Router } from 'express'
import * as facturasController from '../controllers/facturas.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: Gestión de facturas en la tienda
 */

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtiene todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas
 */
router.get('/', facturasController.getAllBills)

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtiene una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', facturasController.getBillById)

// Requiere autenticación para los métodos siguientes
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crea una nueva factura (requiere autenticación)
 *     tags: [Facturas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear la factura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *               total:
 *                 type: number
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Factura creada
 */
router.post('/', facturasController.postBill)

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualiza una factura por ID (requiere autenticación)
 *     tags: [Facturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la factura
 *     requestBody:
 *       description: Datos para actualizar la factura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Factura actualizada
 */
router.put('/:id', facturasController.updateBill)

/**
 * @swagger
 * /facturas/{id}:
 *   patch:
 *     summary: Activa o desactiva una factura (requiere autenticación)
 *     tags: [Facturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la factura
 *     requestBody:
 *       description: Estado activo o inactivo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch('/:id', facturasController.patchBill)

export default router
