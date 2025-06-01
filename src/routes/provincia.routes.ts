import { Router } from 'express'
import * as provinciaController from '../controllers/provincia.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Provincias
 *   description: Gestión de provincias para la tienda de ropa
 */

/**
 * @swagger
 * /provincia:
 *   get:
 *     summary: Obtiene todas las provincias
 *     tags: [Provincias]
 *     responses:
 *       200:
 *         description: Lista de provincias
 */
router.get('/', provinciaController.getAllProvinces)

/**
 * @swagger
 * /provincia/{id}:
 *   get:
 *     summary: Obtiene una provincia por ID
 *     tags: [Provincias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Provincia encontrada
 *       404:
 *         description: Provincia no encontrada
 */
router.get('/:id', provinciaController.getProvinceById)

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /provincia:
 *   post:
 *     summary: Crea una nueva provincia (requiere autenticación)
 *     tags: [Provincias]
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
 *     responses:
 *       201:
 *         description: Provincia creada
 */
router.post('/', provinciaController.createProvince)

/**
 * @swagger
 * /provincia/{id}:
 *   put:
 *     summary: Actualiza una provincia por ID (requiere autenticación)
 *     tags: [Provincias]
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
 *     responses:
 *       200:
 *         description: Provincia actualizada
 */
router.put('/:id', provinciaController.updateProvince)

/**
 * @swagger
 * /provincia/{id}:
 *   patch:
 *     summary: Activa o desactiva una provincia (requiere autenticación)
 *     tags: [Provincias]
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
router.patch('/:id', provinciaController.patchProvince)

export default router
