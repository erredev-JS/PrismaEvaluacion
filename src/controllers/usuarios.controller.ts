import { Request, Response } from 'express'
import * as usuariosServices from "../services/usuarios.service"
import * as utils from '../utils/utils'
import * as auhtUtils from '../controllers/authController'




export const postUser = async (req: Request, res: Response) => {
	try {
		const {
			dni,
			email,
			nombre,
			contrasenia,
			usuario,
			direccion_id,
			talla_id,
			activo,
			
		} = req.body

		// Verificamos los campos obligatorios como en el ejemplo:
		if (
			!contrasenia ||
			!dni ||
			!email || !usuario
		) {
            res.status(400).json({ error: 'Faltan atributos obligatorios' })
            return 
		}

		const body = {
			dni,
			email,
			nombre,
			contrasenia,
			usuario,
			direccion_id,
			talla_id,
			activo,
		}

		const newUser = await usuariosServices.createUser(body)
		if (!newUser) {
            res.status(404).json({ error: 'Error al crear el usuario' })
			
            return 
		}else{
            
            res.status(201).json(utils.convertBigIntFields(newUser))
            return
        }

	} catch (err: unknown) {
		if (err instanceof Error) {
            res.status(500).json({ error: err.message })
			return 
		} else {
            res.status(500).json({ error: 'Error desconocido' })
			return 
		}
	}
}

export const getAllUsers = async (req:Request, res:Response) => {
    try {
        const usuarios = await usuariosServices.getAllUsers()
        
        res.status(200).json(utils.convertBigIntFields(usuarios))
        return

    }catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
      return
    } else {
      res.status(500).json({ error: 'Error desconocido' })
      return
    }
  }
}

export const getUserById = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const usuario = await usuariosServices.getUserById(id)
        if(!usuario){
            res.status(404).json({error: "usuario no encontrado"})
            return
        }else{
            res.status(200).json(utils.convertBigIntFields(usuario))
            return
        }

    }catch (err: unknown) {
        if (err instanceof Error) {
      res.status(500).json({ error: err.message })
      return
    } else {
      res.status(500).json({ error: 'Error desconocido' })
      return
    }
  }
}





export const updateUser = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)
        const body = req.body

        const user = await usuariosServices.getUserById(id)
        if(!user){
            res.status(404).json({ error: `Error al encontrar el usuario con id: ${id}` })
      return
        }else{
            const updatedUser = await usuariosServices.updateUser(body, id)
            if(!updatedUser){
                res.status(200).json({error: "Error al actualizar usuario"})
                return
            }else{
                res.status(201).json(utils.convertBigIntFields(updatedUser))
                return
            }
        }
    }catch (err: unknown) {
        if (err instanceof Error) {
      res.status(500).json({ error: err.message })
      return
    } else {
      res.status(500).json({ error: 'Error desconocido' })
      return
    }
  }
}

export const patchUser = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const {activo} = req.body
        const user = await usuariosServices.getUserById(id)
        if(!user){
            res.status(404).json({ error: `Error al encontrar el usuario con id: ${id}` })
            return
        } else{
            const updatedUser = await usuariosServices.patchUser(activo, id)
            if(!updatedUser){
                res.status(404).json({error: "error al patchear el usuario"})
            }else{
                res.status(200).json(utils.convertBigIntFields(updatedUser))
                return
            }
        }
    }catch (err: unknown) {
        if (err instanceof Error) {
      res.status(500).json({ error: err.message })
      return
    } else {
      res.status(500).json({ error: 'Error desconocido' })
      return
    }
  }
}

// Login 

export const login = async (req: Request, res: Response) => {
  const {nombre, contrasenia} = req.body

  if(!nombre || !contrasenia){
    res.status(400).json({error: 'Faltan credenciales'})
  }

  const result = await usuariosServices.userValidate(nombre, contrasenia)

  if(!result){
    res.status(401).json({error: 'Credenciales invalidas'})
    return

  }

  res.json(utils.convertBigIntFields(result))

}


// Register 

export const register = async (req: Request, res: Response) => {
  try {
    const {
      dni,
      email,
      nombre,
      contrasenia,
      usuario,
      direccion_id,
      talla_id,
      activo,
    } = req.body

    if (!contrasenia || !dni || !email) {
      res.status(400).json({ error: 'Faltan atributos obligatorios' })
      return
    }

    // Validar tipos de datos si es necesario
    const parsedBody = {
      dni: String(dni), // aseguramos que sea string
      email,
      nombre,
      contrasenia,
      usuario: Number(usuario), // aseguramos que sea number
      direccion_id: Number(direccion_id),
      talla_id: Number(talla_id),
      activo: Boolean(activo)
    }

    // Hasheamos la contraseña
    const hashedPassword = await auhtUtils.hashPassword(parsedBody.contrasenia)

    // Creamos el usuario con la contraseña hasheada
    const newUser = await usuariosServices.createUser({
      ...parsedBody,
      contrasenia: hashedPassword
    })

    if (!newUser) {
      res.status(500).json({ error: 'Error al registrar usuario' })
      return
    }

    res.status(201).json(utils.convertBigIntFields(newUser))
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
}
