import { prisma } from '../db/client'


export const createProduct = (data: {
        nombre: string, 
        tipo_producto: number, 
        sexo: string, 
        categoria_id: number,
        precio_id: number, 
        imagen_id: number, 
        descripcion: string, 
        stock: number, 
        activo: boolean
    }) => prisma.productos.create({data})

export const getAllProducts = () => prisma.productos.findMany()

export const getProductById = (id: number) => prisma.productos.findUnique({where: {id}})

export const updateProduct = (
    data: {
        nombre: string, 
        tipo_producto: number, 
        sexo: string, 
        categoria_id: number,
        precio_id: number, 
        imagen_id: number, 
        descripcion: string, 
        stock: number, 
        activo: boolean
    }, id: number
) => {
    return prisma.productos.update({
        where: {id},
        data,
    })
}

export const patchProduct = (activo: boolean, id: number) => {
    return prisma.productos.update({where: {id},
    data: {activo}})
}