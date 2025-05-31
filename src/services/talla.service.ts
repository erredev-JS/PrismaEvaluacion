import { prisma } from "../db/client";

export const getAllSizes = () => prisma.talla.findMany()

export const getSizeById = (id : number) => prisma.talla.findUnique({where : {id}})

export const createSize = (data : {
    talla : string,
    activo : boolean
}) => {
    return prisma.talla.create({data})
}

export const updateSize = (id : number, data : {
    talla : string,
    activo : boolean
}) => {
    return prisma.talla.update({where : {id}, data})
}

export const patchSize = (activo: boolean, id: number) => {
    return prisma.talla.update({where: {id},
    data: {activo}})
}