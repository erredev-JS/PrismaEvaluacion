import { prisma } from '../db/client'

import bcrypt from 'bcrypt'

import * as authUtils from '../controllers/authController'

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

export const getUserById = (id: number) => prisma.usuarios.findUnique({where:{id}})

export const updateUser = (data:{
    dni: string,
    email: string,
    nombre: string,
    contrasenia: string,
    usuario: number,
    direccion_id: number,
    talla_id: number,
    activo: boolean,
    
}, id: number
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

// Login

export const userValidate = async (nombre: string, contrasenia: string) => {

    const user = await prisma.usuarios.findFirst({where: {nombre}})

    if(!user || !user.contrasenia) return null

        
        const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia)
    
        if(!isPasswordValid) return null


        const token = await authUtils.generateToken({nombre})

        return {token}



}