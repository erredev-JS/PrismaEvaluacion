import {Router} from 'express'

import * as usuariosController from '../controllers/usuarios.controller'


const router = Router()

// Login

router.post('/login', usuariosController.login)

// Register

router.post('/register', usuariosController.register)

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})

// Post

router.post('/', usuariosController.postUser)


// Get`s

router.get('/', usuariosController.getAllUsers)

// router.get("/:id", usuariosController.getUserById)

// Update

router.put("/:id", usuariosController.updateUser)

// Disable / Enable

router.patch('/:id', usuariosController.patchUser)



export default router