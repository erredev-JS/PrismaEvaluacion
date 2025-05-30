import { Request, Response } from 'express'
import * as utils from '../utils/utils'
import * as provinciaService from '../services/provincia.service' 

export const getAllProvinces = async(req : Request, res : Response) => {
    try {
        const provincias = await provinciaService.getAllProvinces()
        res.status(200).json(utils.convertBigIntFields(provincias))
        return
    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
        }
    }
}

export const getProvinceById = async (req : Request, res : Response) => {
    const id = Number(req.params.id)
    try {
        const provincia = await provinciaService.getProvinceById(id)
        if (!provincia){
            res.status(404).json({error : 'Provincia no encontrada'})
            return
        } else {
            res.status(200).json(utils.convertBigIntFields(provincia))
            return
        }

    } catch (error : unknown) {
        if (error instanceof Error) {
            res.status(500).json({error : error.message})
            return
        }else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const updateProvince = async(res : Response , req : Request) => {
    const id = Number(req.params.id)
    const body = req.body
    try {
        const provincia = await provinciaService.getProvinceById(id)

        if (!provincia) {
            res.status(404).json({error : 'Provincia no encontrada'})
            return
        } else {

            const updatedProvincia = await provinciaService.updateProvince(body, id)
            if (!updatedProvincia) {
                res.status(400).json({error : 'Error al actualizar provincia'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updatedProvincia))
                return
            }
        } 

    } catch (error : unknown) {
        if (error instanceof Error) {
            res.status(500).json({error : error.message})
            return
        }else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const patchProvince = async (req : Request,res: Response) => {
    const id = Number(req.params.id)
    try {

        const body = Boolean(req.body)

        const provincia = await provinciaService.getProvinceById(id)
        if (!provincia) {
            res.status(404).json({error : 'Provincia no encontrado'})
            return
        } else {
            const updatedProvincia = await provinciaService.patchProvince(body, id)
            if (!updatedProvincia) {
                res.status(400).json({error : 'Error al patchear la provincia'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updatedProvincia))
                return
            }
        }


    } catch (error : unknown) {
        if (error instanceof Error) {
            res.status(500).json({error : error.message})
            return
        }else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}