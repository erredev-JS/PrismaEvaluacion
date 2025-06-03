import express from 'express'
import * as detalleFacturasController from '../controllers/detalle_facturas.controller'

// Swagger tags para Categorias
/**
 * @swagger
 * tags:
 *   name: DetalleFactura
 *   description: Gestión de detalle de las facturas de la tienda de ropa
 */

const router = express.Router()

// Get's

/**
 * @swagger
 * /detalle-factura:
 *   get:
 *     summary: Obtiene todos los detalles de factura
 *     tags: [DetalleFactura]
 *     responses:
 *       200:
 *         description: Lista de detalles
 */
router.get('/', detalleFacturasController.getAllDetalleFacturas)

/**
 * @swagger
 * /detalle-factura/{id}:
 *   get:
 *     summary: Obtiene detalles de factura por ID
 *     tags: [DetalleFactura]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de DetalleFactura
 *     responses:
 *       200:
 *         description: DetalleFactura encontrada
 *       404:
 *         description: DetalleFactura no encontrada
 */
router.get("/:id", detalleFacturasController.getDetalleFacturaById)

// Requiere auth en los métodos después de esta función

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

// Post

/**
 * @swagger
 * /detalle-factura:
 *   post:
 *     summary: Crea DetalleFactura (requiere autenticación)
 *     tags: [DetalleFactura]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear DetalleFactura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - monto
 *               - cantidad
 *               - subtotal
 *               - precio_unitario
 *               - factura_id
 *               - producto_id
 *             properties:
 *               monto:
 *                 type: number
 *               cantidad:
 *                 type: integer
 *               subtotal:
 *                 type: number
 *               precio_unitario:
 *                 type: number
 *               factura_id:
 *                 type: integer
 *               producto_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Detalle de factura creado exitosamente
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', detalleFacturasController.postDetalleFactura)

// Update

/**
 * @swagger
 * /detalle-factura/{id}:
 *   put:
 *     summary: Actualiza un detalle de factura por ID (requiere autenticación)
 *     tags: [DetalleFactura]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura a actualizar
 *     requestBody:
 *       description: Datos para actualizar el detalle de factura (pueden enviarse campos parciales)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *               cantidad:
 *                 type: integer
 *               subtotal:
 *                 type: number
 *               precio_unitario:
 *                 type: number
 *               factura_id:
 *                 type: integer
 *               producto_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Detalle de factura actualizado exitosamente
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", detalleFacturasController.updateDetalleFactura)

// Disable / Enable

/**
 * @swagger
 * /detalle-factura/{id}:
 *   patch:
 *     summary: Activa o desactiva un DetalleFactura(requiere autenticación)
 *     tags: [DetalleFactura]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de DetalleFactura
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
router.patch('/:id', detalleFacturasController.patchDetalleFactura)

export default router
