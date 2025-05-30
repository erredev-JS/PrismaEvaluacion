import { Request, Response } from 'express'

import * as coloresServices from "../services/colores.service"

import * as utils from "../utils/utils"

export const getAllColors = async (req: Request, res: Response) => {
    try{
        const colores = await coloresServices.getAllColors()
        res.status(200).json(utils.convertBigIntFields(colores))
        return
    }catch (err: unknown){
        if(err instanceof Error){
            res.status(500).json({error: err.message})
        }else{
            res.status(500).json({error: "Error desconocido"})
        }
    }
}

export const getColorById = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)
        const color = await (coloresServices.getColorById(id))

        if(!color){
            res.status(400).json({error: 'Color no encontrado'})
            return

        }else{
            res.status(200).json(utils.convertBigIntFields(color))
            return

        }

    }catch (err: unknown){
        if(err instanceof Error){
            res.status(500).json({error: err.message})
        }else{
            res.status(500).json({error: "Error desconocido"})
        }
    }
}

export const createColor = async (req: Request, res: Response) => {
    try{
        const { nombre, valor, activo } = req.body

		if (!nombre || !valor) {
			res.status(400).json({ error: 'Faltan campos obligatorios o tipo de datos incorrecto' })
			return
		}

        const newColor = await coloresServices.createColor({nombre, valor, activo})
        
        res.status(201).json(utils.convertBigIntFields(newColor))
        return

    }catch (err: unknown){
        if(err instanceof Error){
            res.status(500).json({error: err.message})
        }else{
            res.status(500).json({error: "Error desconocido"})
        }
    }
}

export const updateColor = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)
        const body = req.body

        const color = await coloresServices.getColorById(id)
        if(!color){
            res.status(404).json({error: `Error al encontrar el color con id: ${id}`})
           return
        }else{
            const updatedColor = await coloresServices.updateColor(body, id)
            
            if(!updatedColor){
                res.status(400).json({error: "Error al actualizar color"})
            }else{
                res.status(200).json(utils.convertBigIntFields(updatedColor))
                return
            }
        }
        

    }catch (err: unknown){
        if(err instanceof Error){
            res.status(500).json({error: err.message})
        }else{
            res.status(500).json({error: "Error desconocido"})
        }
    }
}


export const patchColor = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)
        const body = Boolean(req.body)

        const color = await coloresServices.getColorById(id)

        if(!color){
            res.status(404).json({error: `Error al encontrar el color con id: ${id}`})
           return
        }else{
            const updatedColor = await coloresServices.patchColor(body, id)
            
            if(!updatedColor){
                res.status(400).json({error: "Error al patchear el color"})
            }else{
                res.status(200).json(utils.convertBigIntFields(updatedColor))
                return
            }
        }
    }catch (err: unknown){
        if(err instanceof Error){
            res.status(500).json({error: err.message})
        }else{
            res.status(500).json({error: "Error desconocido"})
        }
    }
}

