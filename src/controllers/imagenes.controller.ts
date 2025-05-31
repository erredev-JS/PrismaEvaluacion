import { Request, Response } from 'express'

import * as imagenesServices from '../services/imagenes.service'

import * as utils from '../utils/utils'


export const postImage = async(req: Request, res: Response) => {
    const {

        url,
        imagen_id,
        activo

    } = req.body

    if(!url || imagen_id == undefined || activo == undefined){

        res.status(400).json({ error: 'Faltan atributos obligatorios' })
        return

    }

    const body = {
        url,
        imagen_id,
        activo
    }

    try {
        
        const createdImagen = await imagenesServices.createImage(body)

        if(!createdImagen){
            
            res.status(404).json({error: 'Error al crear la imagen'})
            return

        }else{
            
            res.status(201).json(utils.convertBigIntFields(createdImagen))
            return

        }
    } catch (err: unknown) {
        
        if(err instanceof Error){

           res.status(500).json({error: err.message})
           return

        }else{

           res.status(500).json({error: 'Error desconocido'})
           return

        }
    }
    

}

export const getAllImages = async (req: Request, res: Response) => {

    try {
        
        const imagenes = await imagenesServices.getAllImages()

        if(!imagenes){
            
            res.status(404).json({error: 'Error al encontrar imagenes'})
            return

        }else{

            res.status(200).json(utils.convertBigIntFields(imagenes))
            return
        }

    } catch (err: unknown) {

        if(err instanceof Error){

           res.status(500).json({error: err.message})
           return

        }else{

           res.status(500).json({error: 'Error desconocido'})
           return

        }
    }

}

export const getImagesById = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id)
        const imagen = await imagenesServices.getImageById(id)

        if(!imagen){

            res.status(400).json({error: 'Imagen no encontrada'})
            return

        }else{

            res.status(200).json(utils.convertBigIntFields(imagen))
            return

        }

    } catch (err: unknown) {

        if(err instanceof Error){

           res.status(500).json({error: err.message})
           return

        }else{

           res.status(500).json({error: 'Error desconocido'})
           return

        }
    }
}


export const updateImage = async (req: Request, res: Response) => {
    

    const {
        url,
        imagen_id,
        activo
    } = req.body

    if(!url || imagen_id == undefined || activo == undefined){
        res.status(400).json({ error: 'Faltan atributos obligatorios' })
        return
    }

    const body = {
        url,
        imagen_id,
        activo
    }

    try {
        const id = Number(req.params.id)

         if (isNaN(id)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        const imagen = await imagenesServices.getImageById(id)

        if(!imagen){

           res.status(404).json({error: 'Error al encontrar la imagen'})
           return

        }else{

        const updatedImage = await imagenesServices.updateImage(id, body)
        
        if(!updatedImage){

            res.status(400).json({error: 'Error al actualizar la imagen'})
            return
            
        }else{
            
            res.status(200).json(
              utils.convertBigIntFields(updatedImage)
            )
            return
        }
    }
        
        
    } catch (err: unknown) {
        
        if(err instanceof Error){

           res.status(500).json({error: err.message})
           return

        }else{

           res.status(500).json({error: 'Error desconocido'})
           return

        }
    }
}


export const patchImage = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {

            res.status(400).json({ error: "ID inválido" });
            return;

        }

        const { activo } = req.body

        const imagen = await imagenesServices.getImageById(id)

        if(!imagen){

           res.status(404).json({error: 'Error al encontrar la imagen'})
           return

        }else{

        const updatedImage = await imagenesServices.patchImage(id, activo)
        
        if(!updatedImage){

            res.status(400).json({error: 'Error al patchear la imagen'})
            return
            
        }else{
            
            res.status(200).json(
              utils.convertBigIntFields(updatedImage)
            )
            return
        }
    }
        
        
    } catch (err: unknown) {
        
        if(err instanceof Error){

           res.status(500).json({error: err.message})
           return

        }else{

           res.status(500).json({error: 'Error desconocido'})
           return

        }
    }
}