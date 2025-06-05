import {Router} from "express"

import * as detalleController from '../controllers/detalle.controller'

// Swagger tags para Detalles
/**
 * @swagger
 * tags:
 *   name: Detalle
 *   description: Gestión de detalle de las facturas de la tienda de ropa
 */

const router = Router()

// Get's

/**
 * @swagger
 * /detalle:
 *   get:
 *     summary: Obtiene todos los detalles de factura
 *     tags: [Detalle]
 *     responses:
 *       200:
 *         description: Lista de detalles
 */
router.get('/', detalleController.getAllDetalles)

/**
 * @swagger
 * /detalle/{id}:
 *   get:
 *     summary: Obtiene detalle por ID
 *     tags: [Detalle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de Detalle
 *     responses:
 *       200:
 *         description: DetalleFactura encontrada
 *       404:
 *         description: DetalleFactura no encontrada
 */
router.get("/:id", detalleController.getDetalleById)

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
 * /detalle:
 *   post:
 *     summary: Crea un nuevo Detalle (requiere autenticación)
 *     tags: [Detalle]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear Detalle
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - color_id
 *               - talla_id
 *               - stock
 *               - precio_id
 *             properties:
 *               color_id:
 *                 type: integer
 *               talla_id:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               precio_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *           example:
 *             color_id: 1
 *             talla_id: 2
 *             stock: 100
 *             precio_id: 5
 *             activo: true
 *     responses:
 *       201:
 *         description: Detalle creado exitosamente
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', detalleController.postDetalle)

// Update

/**
 * @swagger
 * /detalle/{id}:
 *   put:
 *     summary: Actualiza un detalle por ID (requiere autenticación)
 *     tags: [Detalle]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a actualizar
 *     requestBody:
 *       description: Datos para actualizar el detalle (pueden enviarse campos parciales)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color_id:
 *                 type: integer
 *               talla_id:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               precio_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *           example:
 *             color_id: 2
 *             talla_id: 3
 *             stock: 50
 *             precio_id: 4
 *             activo: true
 *     responses:
 *       200:
 *         description: Detalle de factura actualizado exitosamente
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", detalleController.updateDetalle)

// Disable / Enable

/**
 * @swagger
 * /detalle/{id}:
 *   patch:
 *     summary: Activa o desactiva un DetalleFactura(requiere autenticación)
 *     tags: [Detalle]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de Detalle
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
router.patch('/:id', detalleController.patchDetalle)

export default router
