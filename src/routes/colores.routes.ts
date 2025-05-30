import express from "express"

import * as coloresController from "../controllers/colores.controller"

const router = express.Router()

router.get("/", coloresController.getAllColors)

router.get("/:id", coloresController.getColorById)

router.post("/", coloresController.createColor)

router.put("/:id", coloresController.updateColor)

router.patch("/id", coloresController.patchColor)

export default router