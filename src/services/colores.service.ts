import {prisma} from "../db/client"

export const getAllColors = () => prisma.colores.findMany()

export const getColorById = (id: number) => prisma.colores.findUnique({where:{id}})

export const createColor = async (data:{
    nombre: string,
    valor: string,
    activo: boolean,
}) => {
    return prisma.colores.create({
        data
    })
}

export const updateColor = (data:{
    nombre: string,
    valor: string,
    activo: boolean
}, id: number
) => {
    return prisma.colores.update({
        where:{id},
        data
    })
} 

export const patchColor = (activo: boolean, id:number) => {
    return prisma.colores.update({where:{id}, data:{activo}})
}
