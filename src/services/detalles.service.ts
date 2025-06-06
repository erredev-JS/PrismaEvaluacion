import { detalles } from "@prisma/client";
import { prisma } from "../db/client";

export const getAllDetails = () => prisma.detalles.findMany()

export const getDetailsById = (id : number) => prisma.detalles.findUnique({where : {id}})

export const postDetails = async (data : {

    color_id : number,
    talla_id : number,
    stock : number,
    precio_id: number,
    producto_id: number,
    activo: boolean
}) => {
    const {color_id, talla_id, precio_id, producto_id} = data

    const existingColor = await prisma.colores.findUnique({where : {id: color_id}})
    const existingSize = await prisma.talla.findUnique({where : {id : talla_id}})
    const existingPrice = await prisma.precios.findUnique({where : {id: precio_id}})
    const existingProduct = await prisma.productos.findUnique({where:{id: producto_id}})

    if (!existingColor) {
        throw new Error (`El color con id : ${color_id} no existe`)
    }

    if (!existingSize){
        throw new Error (`El talle con id : ${talla_id} no existe`)
    }

    if (!existingPrice){
        throw new Error (`El precio con id : ${precio_id} no existe`)
    }
    if (!existingProduct){
        throw new Error (`El producto con id : ${producto_id} no existe`)
    }

    return await prisma.detalles.create({
        data 
    })
}

export const putDetails = async(data : Partial<detalles>, id : number) =>{
    return prisma.detalles.update({
        where : {id},
        data
    })
}

export const patchDetails = async(id : number, activo : boolean) => prisma.detalles.update({where : {id}, data : {activo}})