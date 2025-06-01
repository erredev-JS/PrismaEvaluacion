import {Router} from 'express'

import * as usuariosController from '../controllers/usuarios.controller'

const router = Router()

// Post

router.post('/', usuariosController.postUser)


// Get`s

router.get('/', usuariosController.getAllUsers)

// router.get("/:id", usuariosController.getUserById)

// Update

router.put("/:id", usuariosController.updateUser)

// Disable / Enable

router.patch('/:id', usuariosController.patchUser)


// Login

router.post('/login', usuariosController.login)

// Register

router.post('/register', usuariosController.register)


export default router