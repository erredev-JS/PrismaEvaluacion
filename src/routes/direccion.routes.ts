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
 *               - codigo_postal
 *               - user_id
 *               - localidad_id
 *               
 *             properties:
 *               codigo_postal:
 *                 type: number
 *               numero:
 *                 type: number
 *               calle:
 *                 type: string
 *               user_id:
 *                 type: number
 *               localidad_id:
 *                 type: number
 *               
 *             example:
 *               codigo_postal: 5515
 *               numero: 290
 *               calle: "Capetillo"
 *               user_id: 2
 *               localidad_id: 4
 *               activo: true
 *     responses:
 *       201:
 *         description: Dirección creada
 *       400: 
 *          description: Error en los datos enviados
 *       500: 
 *          description: Error en el servidor
 *       
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
 * 
 *             properties:
 *               codigo_postal:
 *                 type: number
 *               numero:
 *                 type: number
 *               calle:
 *                 type: string
 *               user_id:
 *                 type: number
 *               localidad_id:
 *                 type: number
 *               activo:
 *                 type: boolean
 * 
 *             example:
 *               codigo_postal: 5500
 *               numero: 123
 *               calle: "Ozamis"
 *               user_id: 1
 *               localidad_id: 5
 
 *     responses:
 *       200:
 *         description: Dirección actualizada
 *       404:
 *         description: No se encontró la dirección
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
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
 *
 *             example: 
 *               activo: false 
 * 
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: No se encontro la direccion
 *       400:
 *         description: No se pudo patchear la direccion
 *       500:
 *         description: Error en el servidor 
 */
router.patch('/:id', addressController.patchAdress)

export default router
