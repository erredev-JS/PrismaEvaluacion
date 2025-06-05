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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               activo:
 *                 type: boolean
 *             required:
 *               - url
 *           example:
 *             url: https://assets.adidas.com/images/w_600,f_auto,q_auto/5002fee0521a4b87b878f79f066afb34_9366/Zapatillas_Handball_Spezial_Granate_JP8726_00_plp_standard.jpg
 
 *     responses:
 *       201:
 *         description: Imagen creada
 *       500: 
 *         description: Error al crear la imagen
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
 *               activo:
 *                 type: boolean
 * 
 *           example: 
 *             url: https://assets.adidas.com/images/w_600,f_auto,q_auto/2fb23ba467e54b1fb3469c7824bbc40e_9366/Zapatillas_adidas_Grand_Court_Base_00s_Negro_IH6184_00_plp_standard.jpg
 *     responses:
 *       200:
 *         description: Imagen actualizada
 *       404: 
 *         description: Imagen no encontrada
 *       500:
 *         description: Error al actualizar la imagen 
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
 *       404: 
 *         description: Imagen no encontrada
 *       500:
 *         description: Error al patchear la imagen
 */
router.patch('/:id', imagenesController.patchImage)

export default router
