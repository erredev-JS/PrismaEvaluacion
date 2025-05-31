import { Request, Response } from 'express'
import * as usuariosServices from "../services/usuarios.service"
import * as utils from '../utils/utils'



export const createUser = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const usuario = await usuariosServices.createUser(body)
        if (!usuario) {
          res.status(404).json({ error: 'Error al crear el producto' })
          return
        } else {
          res.status(200).json(utils.convertBigIntFields(usuario))
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

// export const createUser = async (req:Request, res:Response) => {
//     try {
//         const userSended = req.body

//         const requiredFields = ['constrasenia', 'nombre_usuario', 'dni', 'email']
// 		const missingField = requiredFields.find((field) => !userSended[field])

// 		if (missingField) {
// 			return res.status(400).json({ error: `Falta el campo obligatorio: ${missingField}` })
// 		}else{
//             const newUser = await usuariosServices.createUser(userSended)
//             res.status(201).json(utils.convertBigIntFields(newUser))
//             return

//         }


//     }catch (err: unknown) {
//         if (err instanceof Error) {
//       res.status(500).json({ error: err.message })
//       return
//     } else {
//       res.status(500).json({ error: 'Error desconocido' })
//       return
//     }
//   }
// }

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

        const body = Boolean(req.body)
        const user = await usuariosServices.getUserById(id)
        if(!user){
            res.status(404).json({ error: `Error al encontrar el usuario con id: ${id}` })
            return
        } else{
            const updatedUser = await usuariosServices.patchUser(body, id)
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


