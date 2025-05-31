import { productos } from '@prisma/client'
import {prisma} from '../db/client'

export const createCategoria = (data: {nombre: string, activo: boolean}) => prisma.categoria.create({data})

export const getAllCategoria = () => prisma.categoria.findMany()


export const getCategoriaById = (id: number) => prisma.categoria.findUnique({where: {id}})

export const updateCategoria = (
    data: {nombre: string, activo: boolean},
    id: number
) => prisma.categoria.update({where: {id}, data})

export const patchCategoria = (id: number, activo: boolean) => prisma.categoria.update({where: {id}, data: {activo}})