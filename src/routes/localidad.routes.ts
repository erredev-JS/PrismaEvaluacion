import { Router } from 'express'
import * as localityController from '../controllers/localidad.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Localidades
 *   description: Gestión de localidades para la tienda de ropa
 */

/**
 * @swagger
 * /localidad:
 *   get:
 *     summary: Obtiene todas las localidades
 *     tags: [Localidades]
 *     responses:
 *       200:
 *         description: Lista de localidades
 */
router.get('/', localityController.getAllLocalities)

/**
 * @swagger
 * /localidad/{id}:
 *   get:
 *     summary: Obtiene una localidad por ID
 *     tags: [Localidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la localidad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Localidad encontrada
 *       404:
 *         description: Localidad no encontrada
 */
router.get('/:id', localityController.getLocalityById)

// Requiere autenticación en adelante
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /localidad:
 *   post:
 *     summary: Crea una nueva localidad (requiere autenticación)
 *     tags: [Localidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos de la nueva localidad
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               provinciaId:
 *                 type: string
 *             required:
 *               - nombre
 *               - provincia_id
 *           example:
 *             nombre: "Gutierres"
 *             provincia_id: 1
 *             activo: true
 *     responses:
 *       201:
 *         description: Localidad creada
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.post('/', localityController.createLocality)

/**
 * @swagger
 * /localidad/{id}:
 *   put:
 *     summary: Actualiza una localidad por ID (requiere autenticación)
 *     tags: [Localidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la localidad
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos para actualizar la localidad
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               provincia_id:
 *                 type: string
 *           example:
 *             nombre: "Las Heras"
 *             provincia_id: 1
 *             activo: true
 *     responses:
 *       200:
 *         description: Localidad actualizada
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', localityController.updateLocality)

/**
 * @swagger
 * /localidad/{id}:
 *   patch:
 *     summary: Activa o desactiva una localidad (requiere autenticación)
 *     tags: [Localidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la localidad
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
 *           example:
 *             activo: true
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id', localityController.patchLocality)

export default router
