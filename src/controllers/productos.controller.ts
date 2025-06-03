import { Request, Response } from 'express'

import * as productosServices from '../services/productos.service'

import * as utils from '../utils/utils'


export const postProduct = async (req: Request, res: Response) => {
    const {
    nombre,
    tipo_producto,
    sexo,
    categoria_id,
    precio_id,
    imagen_id,
    descripcion,
    stock,
    activo
  } = req.body

     if (
    !nombre || 
    !tipo_producto || 
    !sexo || 
    categoria_id === undefined ||
    precio_id === undefined ||
    imagen_id === undefined ||
    !descripcion || 
    stock === undefined || 
    activo === undefined
  ) {
    res.status(400).json({ error: 'Faltan atributos obligatorios' })
    return
  }
    const body = {
    nombre,
    tipo_producto,
    sexo,
    categoria_id,
    precio_id,
    imagen_id,
    descripcion,
    stock,
    activo
  }

    try {
        const createdProducto = await productosServices.createProduct(body)
        if(!createdProducto){
           res.status(404).json({error: 'Error al crear el producto'})
           return
        }else{

            res.status(201).json(
              utils.convertBigIntFields(createdProducto)
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
    try {
        
        const id = Number(req.params.id)
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
    const  {
    nombre,
    tipo_producto,
    sexo,
    categoria_id,
    precio_id,
    imagen_id,
    descripcion,
    stock,
    activo
  } = req.body

  const body: Partial<typeof req.body> = {}

  if (nombre !== undefined) body.nombre = nombre;
  if (tipo_producto !== undefined) body.tipo_producto = tipo_producto;
  if (sexo !== undefined) body.sexo = sexo;
  if (categoria_id !== undefined) body.categoria_id = categoria_id;
  if (precio_id !== undefined) body.precio_id = precio_id;
  if (imagen_id !== undefined) body.imagen_id = imagen_id;
  if (descripcion !== undefined) body.descripcion = descripcion;
  if (stock !== undefined) body.stock = stock;
  if (activo !== undefined) body.activo = activo;


    try {
        const producto = await productosServices.getProductById(id)
        if(!producto){
           res.status(404).json({error: 'Error al encontrar el producto'})
           return
        }else{

            
            
        const updatedProducto = await productosServices.updateProduct(id, body)
        
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
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        const { activo } = req.body

        const producto = await productosServices.getProductById(id)
        if(!producto){
           res.status(404).json({error: 'Error al encontrar el producto'})
           return
        }else{

            
            
        const updatedProducto = await productosServices.patchProduct(id, activo)
        
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