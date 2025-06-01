import express from 'express'

import * as paisController from '../controllers/pais.controller'

const router = express.Router()

// GetAll

router.get('/', paisController.getAllCountries)

// GetById

router.get('/:id', paisController.getCountryById)

// Requiere auth en los metodos despues de esta funcion

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})


// post
router.post('/', paisController.createCountry)

// update
router.put('/:id', paisController.updateCountry)

// Disable / Enable

router.patch('/:id', paisController.patchPais)

export default router
