import { Router } from 'express'
import * as imagenesController from '../controllers/imagenes.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Imágenes
 *   description: Gestión de imágenes de productos de la tienda
 */

/**
 * @swagger
 * /imagenes:
 *   get:
 *     summary: Obtiene todas las imágenes
 *     tags: [Imágenes]
 *     responses:
 *       200:
 *         description: Lista de imágenes
 */
router.get('/', imagenesController.getAllImages)

/**
 * @swagger
 * /imagenes/{id}:
 *   get:
 *     summary: Obtiene una imagen por ID
 *     tags: [Imágenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la imagen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *       404:
 *         description: Imagen no encontrada
 */
router.get('/:id', imagenesController.getImagesById)

// Requiere autenticación en los métodos siguientes
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /imagenes:
 *   post:
 *     summary: Crea una nueva imagen (requiere autenticación)
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos de la nueva imagen
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               nombre:
 *                 type: string
 *               productoId:
 *                 type: string
 *             required:
 *               - url
 *               - productoId
 *     responses:
 *       201:
 *         description: Imagen creada
 */
router.post('/', imagenesController.postImage)

/**
 * @swagger
 * /imagenes/{id}:
 *   put:
 *     summary: Actualiza una imagen por ID (requiere autenticación)
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la imagen
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos para actualizar la imagen
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               nombre:
 *                 type: string
 *               productoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Imagen actualizada
 */
router.put('/:id', imagenesController.updateImage)

/**
 * @swagger
 * /imagenes/{id}:
 *   patch:
 *     summary: Activa o desactiva una imagen (requiere autenticación)
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la imagen
 *         schema:
 *           type: string
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
router.patch('/:id', imagenesController.patchImage)

export default router
