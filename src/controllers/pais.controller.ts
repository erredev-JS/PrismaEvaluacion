import { Request, Response } from 'express'

import * as paisServices from '../services/pais.service'

import * as utils from '../utils/utils'



export const getAllCountries = async(req : Request, res : Response) => {
    try {
        const paises = await paisServices.getAllCountries()
    
        res.status(200).json(utils.convertBigIntFields(paises))
        return 
    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return 

        }else{

            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}


export const getCountryById = async(req : Request, res : Response) => {
    const id = Number(req.params.id)
    
    try {
        const pais = await paisServices.getCountryById(id)

        if (!pais){
            res.status(404).json({error : 'Pais no encontrado'})
            return

        } else {

            res.status(200).json(utils.convertBigIntFields(pais))
            return
        }

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        }else{
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const createCountry = async (req : Request, res : Response) => {
    const{
        nombre,
        activo,
        
    } = req.body

    if (!nombre || !activo){
        res.status(400).json({error : 'Faltan atributos en el body'})
        return
    }

    const body = {
        nombre, activo
    }

    try {
        const newCountry = await paisServices.createCountry(body)
        if (!newCountry){
            res.status(400).json({error : 'Error al crear el pais'})
            return
        } else {
            res.status(201).json(utils.convertBigIntFields(newCountry))
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


export const updateCountry = async (req : Request, res : Response) => {

    const id  = Number(req.params.id)
    const body = req.body

    try {
        const pais = await paisServices.getCountryById(id)
        if (!pais){
            res.status(404).json({error : 'Pais no encontrado'})
            return
        }

        const updatedPais = await paisServices.updateCountry(body, id)

        if(!updatedPais){
            res.status(400).json({error : 'Error al actualizar el pais'})
            return

        } else {

            res.status(200).json(
                utils.convertBigIntFields(updatedPais)
            )
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


export const patchPais = async(req : Request, res : Response) => {
    const id = Number(req.params.id)

    try {
        const {activo} = req.body

        const pais = await paisServices.getCountryById(id)

        if(!pais){
            res.status(404).json({error : 'Pais no encontrado'})
            return
        } else {
            const updatedPais = await paisServices.patchCountry(activo, id)

            if(!updatedPais){
                res.status(400).json({error : 'Error al patchear el pais'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updatedPais))
                return 
            }
        }
    } catch (error : unknown) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}