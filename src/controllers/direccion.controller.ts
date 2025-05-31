import * as addresService from '../services/direccion.service'
import { Request, Response } from 'express'
import * as utils from '../utils/utils'
import { prisma } from '../db/client'

export const getAllAddresses = async(req : Request, res: Response) => {
    try {
            const addresses = await addresService.getAllAddresses()
            res.status(200).json(utils.convertBigIntFields(addresses))
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

export const getAdressById = async (req : Request, res : Response) =>{

    const id = Number(req.params.id)

    try {
        const address = await addresService.getAdressById(id)
        if (!address){
            res.status(404).json({error : 'No se encontro la direccion'})
            return

        } else {
            res.status(200).json(utils.convertBigIntFields(address))
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

export const createAdress = async (req : Request, res : Response) =>{

    const {nombre, codigo_postal, numero, calle, user_id, localidad_id, activo} = req.body

    if (!nombre || !codigo_postal || !numero || !calle || !user_id || !localidad_id || !activo){
        res.status(400).json({error : 'Faltan atributos en el body'})
        return
    }

    try {
        const newAddress = await addresService.createAdress({nombre, codigo_postal, numero, calle, user_id, localidad_id, activo })
        res.status(201).json(utils.convertBigIntFields(newAddress))
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

export const updateAdress = async(req : Request, res : Response) => {
    const id = Number(req.params.id)
    const { codigo_postal, numero, calle, user_id, localidad_id, activo} = req.body 

    if (!codigo_postal || !numero || !calle || !user_id || !localidad_id || !activo){
        res.status(400).json({error : 'Faltan atributos en el body'})
        return
    }

    try {
        
        const updateAddress = await addresService.getAdressById(id)
        if (!updateAddress) {
            res.status(404).json({error : 'No se encontro la direccion'})
            return
        } else {
            res.status(200).json(utils.convertBigIntFields(updateAdress))
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

export const patchAdress = async (req : Request, res : Response) => {
    const id = Number(req.params.id)
    try {
        const {activo} = req.body
        const address = await addresService.getAdressById(id)

        if (!address){
            res.status(404).json({error : 'No se encontro la direccion'})
            return
        } else {
            const updatedAdress = await addresService.patchAdress(id, activo)
            if(!updateAdress){
                res.status(400).json({error : 'No se pudo patchear la direccion'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updateAdress))
                return
            }
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