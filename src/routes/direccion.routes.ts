import express from 'express'
import * as addressController from '../controllers/direccion.controller'
import * as authControllers from '../controllers/authController'

const router = express.Router()  

/**
 * @swagger
 * tags:
 *   name: Direccion
 *   description: Gestión de direcciones
 */

/**
 * @swagger
 * /direccion:
 *   get:
 *     summary: Obtiene todas las direcciones
 *     tags: [Direccion]
 *     responses:
 *       200:
 *         description: Lista de direcciones
 */
router.get('/', addressController.getAllAddresses)

/**
 * @swagger
 * /direccion/{id}:
 *   get:
 *     summary: Obtiene una dirección por ID
 *     tags: [Direccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la dirección
 *     responses:
 *       200:
 *         description: Dirección encontrada
 *       404:
 *         description: Dirección no encontrada
 */
router.get('/:id', addressController.getAdressById)

// Requiere auth en los métodos después de esta función
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /direccion:
 *   post:
 *     summary: Crea una dirección nueva (requiere autenticación)
 *     tags: [Direccion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear dirección
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - calle
 *               - numero
 *             properties:
 *               calle:
 *                 type: string
 *               numero:
 *                 type: string
 *              
 *     responses:
 *       201:
 *         description: Dirección creada
 */
router.post('/', addressController.createAdress)

/**
 * @swagger
 * /direccion/{id}:
 *   put:
 *     summary: Actualiza una dirección por ID (requiere autenticación)
 *     tags: [Direccion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la dirección
 *     requestBody:
 *       description: Datos para actualizar dirección
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calle:
 *                 type: string
 *               numero:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dirección actualizada
 */
router.put('/:id', addressController.updateAdress)

/**
 * @swagger
 * /direccion/{id}:
 *   patch:
 *     summary: Activa o desactiva una dirección (requiere autenticación)
 *     tags: [Direccion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la dirección
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
router.patch('/:id', addressController.patchAdress)

export default router
