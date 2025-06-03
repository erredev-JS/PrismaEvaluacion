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
 *               fecha_compra:
 *                 type: string
 *                 format: date
 *               total:
 *                 type: number
 *               usuario_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *               direccion_comprador:
 *                 type: string
 *               dni_comprador:
 *                 type: string
 *               nombre_comprador:
 *                 type: string
 *               detalle_factura:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     monto:
 *                       type: number
 *                     cantidad:
 *                       type: integer
 *                     subtotal:
 *                       type: number
 *                     precio_unitario:
 *                       type: number
 *                     producto_id:
 *                       type: integer
 *                     activo:
 *                       type: boolean
 *           example:
 *             fecha_compra: "2025-06-03T00:00:00Z"
 *             total: 18000
 *             usuario_id: 1
 *             activo: true
 *             direccion_comprador: "Calle Falsa 123"
 *             dni_comprador: "12345678"
 *             nombre_comprador: "Juan Pérez"
 *             detalle_factura:
 *               - monto: 10000
 *                 cantidad: 1
 *                 subtotal: 10000
 *                 precio_unitario: 10000
 *                 producto_id: 2
 *                 activo: true
 *               - monto: 8000
 *                 cantidad: 1
 *                 subtotal: 8000
 *                 precio_unitario: 8000
 *                 producto_id: 2
 *                 activo: true
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
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
 *           type: integer
 *         description: ID de la factura
 *     requestBody:
 *       description: Datos para actualizar la factura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_compra:
 *                 type: string
 *                 format: date-time
 *               total:
 *                 type: number
 *               usuario_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *               direccion_comprador:
 *                 type: string
 *               dni_comprador:
 *                 type: string
 *               nombre_comprador:
 *                 type: string
 *               detalle_factura:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     monto:
 *                       type: number
 *                     cantidad:
 *                       type: integer
 *                     subtotal:
 *                       type: number
 *                     precio_unitario:
 *                       type: number
 *                     producto_id:
 *                       type: integer
 *                     activo:
 *                       type: boolean
 *           example:
 *             fecha_compra: "2025-06-03T14:45:00Z"
 *             total: 16000
 *             usuario_id: 3
 *             activo: true
 *             direccion_comprador: "Av. San Martín 1234"
 *             dni_comprador: "30123456"
 *             nombre_comprador: "Carlos Pérez"
 *     responses:
 *       200:
 *         description: Factura actualizada
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error del servidor
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
 *           example:
 *             activo: true
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch('/:id', facturasController.patchBill)

export default router
