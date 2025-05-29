import { Request, Response } from 'express'

import * as productosServices from '../services/productos.service'

import * as utils from '../utils/utils'

export const getAllProducts = async (req: Request, res: Response) => {
    try {

        const productos = await productosServices.getAllProducts()
        
        res.status(200).json(utils.convertBigIntFields(productos))

    } catch (err: unknown) {

        if(err instanceof Error){

            res.status(500).json({error: err.message})

        }else{

            res.status(500).json({error: 'Error desconocido'})

        }
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        
        const producto = await productosServices.getProductById(id)
        
        if(!producto){

            res.status(400).json({error: 'Producto no encontrado'})

        }else{

            res.status(200).json(
              utils.convertBigIntFields(producto)
            )

        }


    } catch (err: unknown) {

        if(err instanceof Error){

            res.status(500).json({error: err.message})

        }else{

            res.status(500).json({error: 'Error desconocido'})

        }
    }
}