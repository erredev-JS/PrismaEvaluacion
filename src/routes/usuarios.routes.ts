import { Router } from 'express'
import * as usuariosController from '../controllers/usuarios.controller'
import * as authControllers from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios en la tienda de ropa
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token de autenticación
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', usuariosController.login)

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/register', usuariosController.register)

// Middleware para proteger rutas siguientes con autenticación
router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *               email:
 *                 type: string
 *               nombre:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               usuario:
 *                 type: integer
 *               direccion_id:
 *                 type: integer
 *               talla_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *           example:
 *             dni: "12457896"
 *             email: "luispro@gmail.com"
 *             nombre: "Luis"
 *             contrasenia: "LuisContrasenia"
 *             usuario: 0
 *             direccion_id: 2
 *             talla_id: 2
 *             activo: true
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.post('/', usuariosController.postUser)

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', usuariosController.getAllUsers)

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *               email:
 *                 type: string
 *               nombre:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               usuario:
 *                 type: integer
 *               direccion_id:
 *                 type: integer
 *               talla_id:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *           example:
 *             dni: "12457896"
 *             email: "luispro@gmail.com"
 *             nombre: "Luis Actualizado"
 *             contrasenia: "NuevaContrasenia123"
 *             usuario: 0
 *             direccion_id: 2
 *             talla_id: 2
 *             activo: true
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', usuariosController.updateUser)

/**
 * @swagger
 * /usuarios/{id}:
 *   patch:
 *     summary: Activar o desactivar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a modificar
 *     requestBody:
 *       description: Cambiar el estado del campo "activo"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activo:
 *                 type: boolean
 *             example:
 *               activo: false
 *     responses:
 *       200:
 *         description: Estado del usuario modificado
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id', usuariosController.patchUser)

export default router
