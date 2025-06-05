import { Router } from 'express'
import * as sizeController from '../controllers/talla.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tallas
 *   description: Gestión de tallas para la tienda de ropa
 */

/**
 * @swagger
 * /talla:
 *   get:
 *     summary: Obtiene todas las tallas
 *     tags: [Tallas]
 *     responses:
 *       200:
 *         description: Lista de tallas
 */
router.get('/', sizeController.getAllSizes)

/**
 * @swagger
 * /talla/{id}:
 *   get:
 *     summary: Obtiene una talla por ID
 *     tags: [Tallas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Talla encontrada
 *       404:
 *         description: Talla no encontrada
 */
router.get('/:id', sizeController.getSizesById)

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /talla:
 *   post:
 *     summary: Crea una nueva talla (requiere autenticación)
 *     tags: [Tallas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             required:
 *               - nombre
 *           example:
 *             talla: XXL
 *     responses:
 *       201:
 *         description: Talle creado
 *       500:
 *         description: Error al crear el talle
 */
router.post('/', sizeController.createSize)

/**
 * @swagger
 * /talla/{id}:
 *   put:
 *     summary: Actualiza una talla por ID (requiere autenticación)
 *     tags: [Tallas]
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
 *               nombre:
 *                 type: string
 *               activo:
 *                 type: boolean
 *           example:
 *             talla: XL
 *             activo: true
 *     responses:
 *       200:
 *         description: Talle actualizado
 *       404:
 *         description: Talle no encontrado
 *       500:
 *         description: Error al actualizar el talle
 */
router.put('/:id', sizeController.updateSize)

/**
 * @swagger
 * /talla/{id}:
 *   patch:
 *     summary: Activa o desactiva una talla (requiere autenticación)
 *     tags: [Tallas]
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
 *       404:
 *         description: Talle no encontrado
 *       500: 
 *         description: Error al patchear el talle
 */
router.patch('/:id', sizeController.patchSize)

export default router
