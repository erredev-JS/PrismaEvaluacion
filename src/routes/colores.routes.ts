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
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch("/:id", coloresController.patchColor)

export default router
