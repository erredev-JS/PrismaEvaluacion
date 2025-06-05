import { Router } from 'express'
import * as productosController from '../controllers/productos.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos en la tienda de ropa
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productosController.getAllProducts)

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productosController.getProductById)

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto (requiere autenticación)
 *     tags: [Productos]
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
 *               tipo_producto:
 *                 type: string
 *               sexo:
 *                 type: string
 *               categoria_id:
 *                 type: integer
 *               imagen_id:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               activo:
 *                 type: boolean
 *             required:
 *               - nombre
 *               - tipo_producto
 *               - sexo
 *               - categoria_id
 *               - imagen_id
 *               - descripcion
 *               - activo
 *     responses:
 *       201:
 *         description: Producto creado
 */

router.post('/', productosController.postProduct)

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto por ID (requiere autenticación)
 *     tags: [Productos]
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
 *               tipo_producto:
 *                 type: string
 *               sexo:
 *                 type: string
 *               categoria_id:
 *                 type: integer
 *               imagen_id:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               activo:
 *                 type: boolean
 *             required:
 *               - nombre
 *               - tipo_producto
 *               - sexo
 *               - categoria_id
 *               - imagen_id
 *               - descripcion
 *               - activo
 *     responses:
 *       200:
 *         description: Producto actualizado
 */

router.put('/:id', productosController.updateProduct)

/**
 * @swagger
 * /productos/{id}:
 *   patch:
 *     summary: Activa o desactiva un producto (requiere autenticación)
 *     tags: [Productos]
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
 *           example:
 *             activo: true
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch('/:id', productosController.patchProduct)

export default router
