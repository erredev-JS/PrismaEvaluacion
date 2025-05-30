import { Request, Response } from 'express'

import * as productosServices from '../services/productos.service'

import * as utils from '../utils/utils'

export const getAllProducts = async (req: Request, res: Response) => {
    try {

        const productos = await productosServices.getAllProducts()
        
        res.status(200).json(utils.convertBigIntFields(productos))
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

export const getProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        
        const producto = await productosServices.getProductById(id)
        
        if(!producto){

           res.status(400).json({error: 'Producto no encontrado'})
           return

        }else{

           res.status(200).json(
              utils.convertBigIntFields(producto)
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


export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const body = req.body
    try {
        const producto = await productosServices.getProductById(id)
        if(!producto){
           res.status(404).json({error: `Error al encontrar el producto con id: ${id}`})
           return
        }else{

            
            
        const updatedProducto = await productosServices.updateProduct(body, id)
        
        if(!updatedProducto){

            res.status(400).json({error: 'Error al actualizar el producto'})
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

        const producto = await productosServices.getProductById(id)
        if(!producto){
           res.status(404).json({error: `Error al encontrar el producto con id: ${id}`})
           return
        }else{

            
            
        const updatedProducto = await productosServices.patchProduct(body, id)
        
        if(!updatedProducto){

            res.status(400).json({error: 'Error al patchear el producto'})
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