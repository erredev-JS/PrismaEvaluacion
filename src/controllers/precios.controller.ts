import { Request, Response } from 'express'

import * as preciosServices from '../services/precios.service'

import * as utils from '../utils/utils'

export const  postPrice = async (req: Request, res: Response) => {
   
    const {
    precio_compra,
    precio_venta,
    descuento_id,
    activo
    } = req.body

    if(precio_compra === undefined || precio_venta === undefined ||descuento_id == undefined || activo === undefined){

        res.status(400).json({ error: 'Faltan atributos obligatorios' })
        return

    }

    const body = {
        precio_compra,
        precio_venta,
        descuento_id,
        activo
    }

    try {
        
        const createdPrecio = await preciosServices.createPrice(body)

        if(!createdPrecio){

            res.status(404).json({error: 'Error al crear el precio'})
           return

        }else{

            res.status(201).json(
                utils.convertBigIntFields(createdPrecio)
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

export const getAllPrices = async (req: Request, res: Response) => {

    try {
        
        const precios = await preciosServices.getAllPrices()

        res.status(200).json(utils.convertBigIntFields(precios))
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

export const getPriceById = async (req: Request, res: Response) => {

    try {
        
        const id = Number(req.params.id)

        if (isNaN(id)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        const precio = await  preciosServices.getPriceById(id)

        if(!precio){

            res.status(400).json({error: 'Error al patchear el producto'})
            return

        }else{

            res.status(200).json(
                utils.convertBigIntFields(precio)
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

export const updatePrice = async (req: Request, res: Response) => {

    const {
    precio_compra,
    precio_venta,
    descuento_id,
    activo
    } = req.body

    if(precio_compra === undefined || precio_venta === undefined ||descuento_id == undefined || activo === undefined){

        res.status(400).json({ error: 'Faltan atributos obligatorios' })
        return

    }

    const body = {
        precio_compra,
        precio_venta,
        descuento_id,
        activo
    }
    
    try {

        const id = Number(req.params.id)

        const price = await preciosServices.getPriceById(id)

        if(!price){
            res.status(404).json({error: 'Error al encontrar el precio'})
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

export const patchPrice = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
   
           if (isNaN(id)) {
               res.status(400).json({ error: "ID inválido" });
               return;
           }
   
           const { activo } = req.body
   
           const price = await preciosServices.getPriceById(id)
           if(!price){
              res.status(404).json({error: 'Error al encontrar el precio'})
              return
           }else{
   
               
               
           const updatedPrice = await preciosServices.patchPrice(id, activo)
           
           if(!updatedPrice){
   
               res.status(400).json({error: 'Error al patchear el precio'})
               return
               
           }else{
               
               res.status(200).json(
                 utils.convertBigIntFields(updatedPrice)
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