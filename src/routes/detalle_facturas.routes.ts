import express from 'express'
import * as categoriasController from '../controllers/categorias.controller'

// Swagger tags para Categorias
/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gestión de categorías de la tienda de ropa
 */

const router = express.Router()

// Get's

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', categoriasController.getAllCategories)

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", categoriasController.getCategoryById)

// Requiere auth en los métodos después de esta función

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

// Post

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría (requiere autenticación)
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para crear una categoría
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
 *         description: Categoría creada
 */
router.post('/', categoriasController.postCategory)

// Update

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría por ID (requiere autenticación)
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       description: Datos para actualizar la categoría
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
 *         description: Categoría actualizada
 */
router.put("/:id", categoriasController.updateCategory)

// Disable / Enable

/**
 * @swagger
 * /categorias/{id}:
 *   patch:
 *     summary: Activa o desactiva una categoría (requiere autenticación)
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
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
router.patch('/:id', categoriasController.patchCategory)

export default router
