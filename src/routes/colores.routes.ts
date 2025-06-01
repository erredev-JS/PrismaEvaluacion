import express from "express"

import * as coloresController from "../controllers/colores.controller"

const router = express.Router()

router.get("/", coloresController.getAllColors)

router.get("/:id", coloresController.getColorById)

// Requiere auth en los metodos despues de esta funcion

import * as authControllers from '../controllers/authController'

router.use((req, res, next) => {
  if (req.method) {
    authControllers.authenticateToken(req, res, next)
  } else {
    next()
  }
})


router.post("/", coloresController.createColor)

router.put("/:id", coloresController.updateColor)

router.patch("/id", coloresController.patchColor)

export default router