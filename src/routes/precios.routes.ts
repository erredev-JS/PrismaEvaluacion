import { Router } from 'express'
import * as preciosController from '../controllers/precios.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Precios
 *   description: Gestión de precios de productos
 */

/**
 * @swagger
 * /precios:
 *   get:
 *     summary: Obtiene todos los precios
 *     tags: [Precios]
 *     responses:
 *       200:
 *         description: Lista de precios
 */
router.get('/', preciosController.getAllPrices)

/**
 * @swagger
 * /precios/{id}:
 *   get:
 *     summary: Obtiene un precio por ID
 *     tags: [Precios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Precio encontrado
 *       404:
 *         description: Precio no encontrado
 */
router.get('/:id', preciosController.getPriceById)

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /precios:
 *   post:
 *     summary: Crea un nuevo precio (requiere autenticación)
 *     tags: [Precios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *             required:
 *               - valor
 *     responses:
 *       201:
 *         description: Precio creado
 */
router.post('/', preciosController.postPrice)

/**
 * @swagger
 * /precios/{id}:
 *   put:
 *     summary: Actualiza un precio por ID (requiere autenticación)
 *     tags: [Precios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Precio actualizado
 */
router.put('/:id', preciosController.updatePrice)

/**
 * @swagger
 * /precios/{id}:
 *   patch:
 *     summary: Activa o desactiva un precio (requiere autenticación)
 *     tags: [Precios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
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
router.patch('/:id', preciosController.patchPrice)

export default router
