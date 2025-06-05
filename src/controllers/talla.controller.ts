import { Request, Response } from "express"
import * as sizeService from '../services/talla.service'
import * as utils from '../utils/utils'

export const getAllSizes = async(req : Request, res : Response) =>{
    try {
        const sizes = await sizeService.getAllSizes()
        res.status(200).json(utils.convertBigIntFields(sizes))
    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const getSizesById = async(req : Request, res : Response) =>{
    const id = Number(req.params.id)
    try {
        const size = await sizeService.getSizeById(id)
        if (!size){
            res.status(404).json({error : 'No se encontro el talle'})
            return
        } else {
            res.status(200).json(utils.convertBigIntFields(size))
            return
        }

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const createSize = async(req : Request, res : Response) =>{
    const {talla, activo} = req.body

    if (!talla) {
        res.status(400).json({error : 'Faltan atributos en el body'})
    }
    
    try {
        const newSize = await sizeService.createSize({talla, activo})
        res.status(201).json(utils.convertBigIntFields(newSize))
    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const updateSize = async(req: Request, res : Response) => {
    const id = Number(req.params.id)
    const {talla, activo} = req.body
    
    try {
        const size = await sizeService.getSizeById(id)
        if (!size){
            res.status(404).json({error : 'No se encontro el talle'})
            return
        } else {
            const updatedSize = await sizeService.updateSize(id, {talla, activo})
            if (!updatedSize){
                res.status(400).json({error : 'No se pudo actualizar el talle'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updatedSize))
                return
            }
        }

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const patchSize = async(req :Request, res : Response) => {
    const id = Number(req.params.id)
    const {activo} = req.body

    if (typeof activo !== 'boolean') {
        res.status(400).json({ error: 'Falta el atributo "activo" o no es booleano' });
        return;
    }

    try {
        const size = await sizeService.getSizeById(id)
        if (!size) {
            res.status(404).json({error : 'No se encontro el talle'})
            return
        } else {
            const updatedSize = await sizeService.patchSize( activo, id)
            if (!updatedSize) {
                res.status(400).json({error : 'No se pudo actualizar el talle'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updatedSize))
                return
            }
        }

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}