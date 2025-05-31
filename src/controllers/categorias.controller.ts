import { Request, Response } from 'express'
import * as categoriasServices from '../services/categorias.service'

import * as utils from '../utils/utils'

export const postCategory = async (req: Request, res: Response) => {
    const {nombre, activo} = req.body

    if(!nombre || !activo){
        res.status(400).json({ error: 'Faltan atributos obligatorios' })
        return
    }

    const body = {
        nombre,
        activo
    }

    try {

        const createdCategoria = await categoriasServices.createCategoria(body)

        if(!createdCategoria){
            
            res.status(400).json({error: 'Error al crear la categoria'})

            return

        }else{
            res.status(201).json(
                utils.convertBigIntFields(createdCategoria)
            )
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

export const getAllCategories = async (req: Request, res: Response) => {
    try {

        const categorias = await categoriasServices.getAllCategoria()
        
        res.status(200).json(utils.convertBigIntFields(categorias))
        return

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

export const getCategoryById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        
        const categoria = await categoriasServices.getCategoriaById(id)
        
        if(!categoria){

           res.status(400).json({error: 'Categoria no encontrada'})
           return

        }else{

           res.status(200).json(
              utils.convertBigIntFields(categoria)
            )
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

export const updateCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const body = req.body
    try {
        const producto = await categoriasServices.getCategoriaById(id)
        if(!producto){
           res.status(404).json({error: `Error al encontrar la categoria con el id: ${id}`})
           return
        }else{

            
            
        const updatedProducto = await categoriasServices.updateCategoria(body, id)
        
        if(!updatedProducto){

            res.status(400).json({error: 'Error la categoria'})
            return
            
        }else{
            
            res.status(200).json(
              utils.convertBigIntFields(updatedProducto)
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


export const patchProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    try {
        const body = Boolean(req.body)

        const producto = await categoriasServices.getCategoriaById(id)
        if(!producto){
           res.status(404).json({error: `Error al encontrar la categoria con id: ${id}`})
           return
        }else{

            
            
        const updatedProducto = await categoriasServices.patchCategoria(id, body)
        
        if(!updatedProducto){

            res.status(400).json({error: 'Error al patchear la categoria'})
            return
            
        }else{
            
            res.status(200).json(
              utils.convertBigIntFields(updatedProducto)
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