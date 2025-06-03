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

// Get all categories
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

// Get category by ID
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
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", categoriasController.getCategoryById)

// Middleware de autenticación
import * as authControllers from '../controllers/authController'
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

// Create category
/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría (requiere autenticación)
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - activo
 *             properties:
 *               nombre:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: Faltan atributos obligatorios o error de validación
 */
router.post('/', categoriasController.postCategory)

// Update category
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
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - activo
 *             properties:
 *               nombre:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *         description: Error al actualizar
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/:id", categoriasController.updateCategory)

// Enable/Disable category
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
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
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
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Error al patchear
 *       404:
 *         description: Categoría no encontrada
 */
router.patch('/:id', categoriasController.patchCategory)

export default router
