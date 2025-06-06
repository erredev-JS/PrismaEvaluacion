import { Router } from 'express'
import * as paisController from '../controllers/pais.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Países
 *   description: Gestión de países para la tienda de ropa
 */

/**
 * @swagger
 * /pais:
 *   get:
 *     summary: Obtiene todos los países
 *     tags: [Países]
 *     responses:
 *       200:
 *         description: Lista de países
 */
router.get('/', paisController.getAllCountries)

/**
 * @swagger
 * /pais/{id}:
 *   get:
 *     summary: Obtiene un país por ID
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: País encontrado
 *       404:
 *         description: País no encontrado
 */
router.get('/:id', paisController.getCountryById)

// Requiere autenticación a partir de acá
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /pais:
 *   post:
 *     summary: Crea un nuevo país (requiere autenticación)
 *     tags: [Países]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo país
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *           example:
 *             nombre: "Francia"
 *             activo: true
 *     responses:
 *       201:
 *         description: País creado
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.post('/', paisController.createCountry)

/**
 * @swagger
 * /pais/{id}:
 *   put:
 *     summary: Actualiza un país por ID (requiere autenticación)
 *     tags: [Países]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos para actualizar el país
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *           example:
 *             nombre: "Francia"
 *             activo: true
 *     responses:
 *       200:
 *         description: País actualizado
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', paisController.updateCountry)

/**
 * @swagger
 * /pais/{id}:
 *   patch:
 *     summary: Activa o desactiva un país (requiere autenticación)
 *     tags: [Países]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país
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
 *         description: Datos inválidos enviados
 *       404:
 *         description: Color no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id', paisController.patchPais)

export default router
