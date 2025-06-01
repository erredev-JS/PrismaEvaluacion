import { prisma } from '../db/client'

export const createUser = (data:{
    dni: string,
    email: string,
    nombre: string,
    contrasenia: string,
    usuario: number,
    direccion_id: number,
    talla_id: number,
    activo: boolean,
    
}) => prisma.usuarios.create({data})


export const getAllUsers = () => prisma.usuarios.findMany()

export const getUserById = (id:number) => prisma.usuarios.findUnique({where:{id}})

export const updateUser = (data:{
    dni: string,
    email: string,
    nombre: string,
    contrasenia: string,
    usuario: number,
    direccion_id: number,
    talla_id: number,
    activo: boolean,
    
}, id:number
) => {
    return prisma.usuarios.update({
        where:{id},
        data
    })
}

export const patchUser = (activo: boolean, id:number) => {
    return prisma.usuarios.update({
        where:{id}, 
        data:{activo}
    })
}