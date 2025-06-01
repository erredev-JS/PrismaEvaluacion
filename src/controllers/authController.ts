import { NextFunction, Request, Response } from 'express';
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



export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' })
    }

    // Podés guardar el usuario en req.user si querés usarlo luego
    (req as any).user = user
    next()
  })}