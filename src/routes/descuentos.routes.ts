import express from 'express'
import * as discountController from '../controllers/descuentos.controller'
import * as authControllers from '../controllers/authController'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Descuento
 *   description: Gestión de descuentos
 */

/**
 * @swagger
 * /descuento:
 *   get:
 *     summary: Obtiene todos los descuentos
 *     tags: [Descuento]
 *     responses:
 *       200:
 *         description: Lista de descuentos
 */
router.get('/', discountController.getAllDescuentos)

/**
 * @swagger
 * /descuento/{id}:
 *   get:
 *     summary: Obtiene un descuento por ID
 *     tags: [Descuento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del descuento
 *     responses:
 *       200:
 *         description: Descuento encontrado
 *       404:
 *         description: Descuento no encontrado
 */
router.get('/:id', discountController.getDescuentoById)

// Requiere autenticación desde aquí
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /descuento:
 *   post:
 *     summary: Crea un nuevo descuento (requiere autenticación)
 *     tags: [Descuento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear descuento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - fecha_desde
 *               - fecha_hasta
 *               - promocion_precio
 *               - tiempo_desde
 *               - tiempo_hasta
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_desde:
 *                 type: string
 *                 format: date
 *               fecha_hasta:
 *                 type: string
 *                 format: date
 *               tiempo_desde:
 *                 type: string
 *               tiempo_hasta:
 *                 type: string
 *               promocion_precio:
 *                 type: number
 *               activo:
 *                 type: boolean
 *           example:
 *             nombre: Descuento verano
 *             descripcion: Promoción para temporada de verano
 *             fecha_desde: "2025-12-01"
 *             fecha_hasta: "2026-02-28"
 *             tiempo_desde: "09:00"
 *             tiempo_hasta: "21:00"
 *             promocion_precio: 20
 *             activo: true
 *     responses:
 *       201:
 *         description: Descuento creado
 */
router.post('/', discountController.postDescuento)

/**
 * @swagger
 * /descuento/{id}:
 *   put:
 *     summary: Actualiza un descuento por ID (requiere autenticación)
 *     tags: [Descuento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del descuento
 *     requestBody:
 *       description: Datos para actualizar el descuento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_desde:
 *                 type: string
 *                 format: date
 *               fecha_hasta:
 *                 type: string
 *                 format: date
 *               tiempo_desde:
 *                 type: string
 *               tiempo_hasta:
 *                 type: string
 *               promocion_precio:
 *                 type: number
 *               activo:
 *                 type: boolean
 *           example:
 *             nombre: Descuento otoño
 *             descripcion: Promoción para temporada baja
 *             fecha_desde: "2025-03-01"
 *             fecha_hasta: "2025-05-31"
 *             tiempo_desde: "10:00"
 *             tiempo_hasta: "20:00"
 *             promocion_precio: 15
 *             activo: false
 *     responses:
 *       200:
 *         description: Descuento actualizado
 */
router.put('/:id', discountController.updateDescuento)

/**
 * @swagger
 * /descuento/{id}:
 *   patch:
 *     summary: Activa o desactiva un descuento (requiere autenticación)
 *     tags: [Descuento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del descuento
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
 *         description: Estado del descuento actualizado
 */
router.patch('/:id', discountController.patchDescuento)

export default router
