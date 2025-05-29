import { prisma } from '../db/client'


export const getAllProducts = () => prisma.productos.findMany()

export const getProductById = (id: number) => prisma.productos.findUnique({where: {id}})