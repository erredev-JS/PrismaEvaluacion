import { prisma } from '../db/client'

interface Producto {
  nombre: string;
  tipo_producto: number;
  sexo: string;
  categoria_id: number;
  precio_id: number;
  imagen_id: number;
  descripcion: string;
  stock: number;
  activo: boolean;
}

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

export const getAllProducts = () => prisma.productos.findMany({
     include: {
        categoria: true,
        imagenes: true,
    }
})

export const getProductById = (id: number) => prisma.productos.findUnique({where: {id},      include: {
        categoria: true,
        imagenes: true,
    }})

export const updateProduct = (id: number, data: Partial<Producto>
) => {
     return prisma.productos.update({
        where: {id},
        data,
        include: {
        categoria: true,
        imagenes: true,
    }})
}

export const patchProduct = (id: number, activo: boolean) =>  prisma.productos.update({where: {id},
    data: {activo}})
