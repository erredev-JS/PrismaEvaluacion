import { detalles, productos } from '@prisma/client'
import { prisma } from '../db/client' 

export const createImage = (data: {
    url: string,
    activo: boolean,
}) => prisma.imagenes.create({data})

export const getAllImages = () => prisma.imagenes.findMany()

export const getImageById = (id: number) => prisma.imagenes.findUnique({where: {id}})

export const updateImage = (id: number, data: {
    url: string,
    activo: boolean,
}) => prisma.imagenes.update({where: {id}, data})

export const patchImage = (id: number, activo: boolean) => prisma.imagenes.update({where: {id}, data: {activo}})