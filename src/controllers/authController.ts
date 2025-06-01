import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'
import { prisma } from '../db/client'
import bcrypt from 'bcrypt'

const SECRET_KEY = 'mi_clave_secreta';

export const generateToken = (user: {nombre: string}) => {

    return jwt.sign({
       
        nombre: user.nombre,
      
    }, SECRET_KEY, {expiresIn: '48h'})
   
}

export const registerUser = async (data: {
            dni: string,
			email: string,
			nombre: string,
			contrasenia: string,
			usuario: number,
			direccion_id: number,
			talla_id: number,
			activo: boolean}) =>
            {

                const hashedPassword = await bcrypt.hash(data.contrasenia, 10)

                const user = await prisma.usuarios.create({
                    data: {
                        ...data,
                        contrasenia: hashedPassword
                    }
                })

            }


export const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(plainPassword, saltRounds)
}