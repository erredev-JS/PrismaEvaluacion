import express from "express"
import * as coloresController from "../controllers/colores.controller"

/**
 * @swagger
 * tags:
 *   name: Colores
 *   description: Gestión de colores para productos
 */
const router = express.Router()

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
 *     responses:
 *       200:
 *         description: Color encontrado
 *       404:
 *         description: Color no encontrado
 */
router.get("/:id", coloresController.getColorById)

import * as authControllers from '../controllers/authController'

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
 *       description: Datos para crear DetalleFactura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - valor
 *             properties:
 *               nombre:
 *                 type: string
 *               valor:
 *                 type: string
 *               activo:
 *                 type: boolean
 *           example:
 *             nombre: "negro"
 *             valor: "#000000"
 *             activo: true
 *     responses:
 *       201:
 *         description: Color creado
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
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
 *           type: integer
 *         description: ID del color a actualizar
 *     requestBody:
 *       description: Datos para actualizar el color
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - valor
 *             properties:
 *               nombre:
 *                 type: string
 *               valor:
 *                 type: string
 *               activo:
 *                 type: boolean
 *           example:
 *             nombre: "gris oscuro"
 *             valor: "#333333"
 *             activo: false
 *     responses:
 *       200:
 *         description: Color actualizado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Color no encontrado
 *       500:
 *         description: Error del servidor
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
 *           type: integer
 *         description: ID del color
 *     requestBody:
 *       description: Estado activo o inactivo del color
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activo
 *             properties:
 *               activo:
 *                 type: boolean
 *           example:
 *             activo: true
 *     responses:
 *       200:
 *         description: Estado del color actualizado correctamente
 *       400:
 *         description: Datos inválidos enviados
 *       404:
 *         description: Color no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", coloresController.patchColor)

export default router
