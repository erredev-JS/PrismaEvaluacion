import express from "express"
import * as coloresController from "../controllers/colores.controller"
import * as authControllers from '../controllers/authController'

const router = express.Router()

// Swagger tags para Colores
/**
 * @swagger
 * tags:
 *   name: Colores
 *   description: Gestión de colores para productos de la tienda
 */

/**
 * @swagger
 * /colores:
 *   get:
 *     summary: Obtiene todos los colores
 *     tags: [Colores]
 *     responses:
 *       200:
 *         description: Lista de colores
 */
router.get("/", coloresController.getAllColors)

/**
 * @swagger
 * /colores/{id}:
 *   get:
 *     summary: Obtiene un color por ID
 *     tags: [Colores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del color
 *     responses:
 *       200:
 *         description: Color encontrado
 *       404:
 *         description: Color no encontrado
 */
router.get("/:id", coloresController.getColorById)

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
 * /colores:
 *   post:
 *     summary: Crea un nuevo color (requiere autenticación)
 *     tags: [Colores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear un color
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
 *     responses:
 *       201:
 *         description: Color creado
 */
router.post("/", coloresController.createColor)

/**
 * @swagger
 * /colores/{id}:
 *   put:
 *     summary: Actualiza un color por ID (requiere autenticación)
 *     tags: [Colores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del color
 *     requestBody:
 *       description: Datos para actualizar el color
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
 *         description: Color actualizado
 */
router.put("/:id", coloresController.updateColor)

/**
 * @swagger
 * /colores/{id}:
 *   patch:
 *     summary: Activa o desactiva un color (requiere autenticación)
 *     tags: [Colores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del color
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
router.patch("/:id", coloresController.patchColor)

export default router
