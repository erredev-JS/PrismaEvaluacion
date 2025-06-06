import { Request, Response } from "express"
import * as detalleServices from "../services/detalles.service"
import * as utils from '../utils/utils'


export const postDetalle = async (req:Request, res:Response) => {
    try{
        const {
            color_id,
            talla_id,
            stock,
            precio_id,
            producto_id,
            activo
        } = req.body

        if(!color_id ||
            !talla_id ||
            !stock ||
            !precio_id || !producto_id
        ){
            res.status(400).json({error: "Faltan atributos obligatorios"})
            return
        }

        const body ={
            color_id,
            talla_id,
            stock,
            precio_id,
            producto_id,
            activo
        }

        const newDetalle = await detalleServices.postDetails(body)
        if(!newDetalle){
            res.status(404).json({ error: 'Error al crear DetalleFactura' })
            
            return 
        }else{
                    
                    res.status(201).json(utils.convertBigIntFields(newDetalle))
                    return
        }
    }catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
            return 
        } else {
            res.status(500).json({ error: 'Error desconocido' })
            return 
        }
    }
}

export const getAllDetalles = async (req:Request, res:Response) => {
    try{
        const detalles = await detalleServices.getAllDetails()

        res.status(200).json(utils.convertBigIntFields(detalles))
        return
    }catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
            return 
        } else {
            res.status(500).json({ error: 'Error desconocido' })
            return 
        }
    }
}

export const getDetalleById = async (req:Request, res:Response) => {
    try{
        const id = Number(req.params.id)

        const detalles = await detalleServices.getDetailsById(id)

        if(!detalles){
            res.status(404).json({error: "Detalle no encontrado"})
            return
        }else{
            res.status(200).json(utils.convertBigIntFields(detalles))
            return
        }
    }catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
            return 
        } else {
            res.status(500).json({ error: 'Error desconocido' })
            return 
        }
    }
}

export const updateDetalle = async (req:Request, res:Response) => {
    try{
        const id = Number(req.params.id)
        const body = req.body

        const detalle = await detalleServices.getDetailsById(id)
        if(!detalle){
            res.status(404).json({error: `Error al encontrar el detalle con Id: ${id}`})
            return
        }else{
            const updatedDetalle = await detalleServices.putDetails(body, id)
            if(!updatedDetalle){
                res.status(400).json({error: "Error al actualizar Detalle"})
                return
            }else{
                res.status(201).json(utils.convertBigIntFields(updatedDetalle))
                return
            }
        }
    }catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
            return 
        } else {
            res.status(500).json({ error: 'Error desconocido' })
            return 
        }
    }
}

export const patchDetalle = async (req:Request, res:Response) => {
    try{
        const id = Number(req.params.id)

        const {activo} = req.body

        const detalle = await detalleServices.getDetailsById(id)
        if(!detalle){
            res.status(404).json({ error: `Error al encontrar el Detalle con id: ${id}` })
            return
        }else{
            const updatedDetalle = await detalleServices.patchDetails(id, activo)
            if(!updatedDetalle){
                res.status(404).json({error: "error al patchear el Detalle"})
                return
            }else{
                res.status(200).json(utils.convertBigIntFields(updateDetalle))
                return
            }
        }
    }catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
            return 
        } else {
            res.status(500).json({ error: 'Error desconocido' })
            return 
        }
    }
}
