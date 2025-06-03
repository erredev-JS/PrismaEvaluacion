import { Request, Response } from 'express'
import * as detalleFacturasServices from "../services/detalle_factura.service"
import * as utils from '../utils/utils'





export const postDetalleFactura = async (req: Request, res: Response) => {
    try {
        const {
            monto,
            cantidad,
            subtotal,
            precio_unitario,
            factura_id,
            producto_id,
            activo
            
        } = req.body

        // Verificamos los campos obligatorios como en el ejemplo:
        if (
            !factura_id ||
            !producto_id ||
            !precio_unitario || !subtotal || !cantidad
        ) {
            res.status(400).json({ error: 'Faltan atributos obligatorios' })
            return 
        }

        const body = {
            monto,
            cantidad,
            subtotal,
            precio_unitario,
            factura_id,
            producto_id,
            activo
        }

        const newDetalleFactura = await detalleFacturasServices.createDetalleFactura(body)
        if (!newDetalleFactura) {
            res.status(404).json({ error: 'Error al crear DetalleFactura' })
            
            return 
        }else{
            
            res.status(201).json(utils.convertBigIntFields(newDetalleFactura))
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

export const getAllDetalleFacturas = async (req:Request, res:Response) => {
    try {
        const detallesFacturas = await detalleFacturasServices.getAllDetalleFactura()
        
        res.status(200).json(utils.convertBigIntFields(detallesFacturas))
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

export const getDetalleFacturaById = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const detalleFactura = await detalleFacturasServices.getDetalleFacturaById(id)
        if(!detalleFactura){
            res.status(404).json({error: "DetalleFactura no encontrado"})
            return
        }else{
            res.status(200).json(utils.convertBigIntFields(detalleFactura))
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





export const updateDetalleFactura = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)
        const body = req.body

        const detalleFactura = await detalleFacturasServices.getDetalleFacturaById(id)
        if(!detalleFactura){
            res.status(404).json({ error: `Error al encontrar la Detalle Factura con id: ${id}` })
      return
        }else{
            const updatedDetalleFactura = await detalleFacturasServices.updateDetalleFactura(body, id)
            if(!updatedDetalleFactura){
                res.status(200).json({error: "Error al actualizar Detalle Factura"})
                return
            }else{
                res.status(201).json(utils.convertBigIntFields(updatedDetalleFactura))
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

export const patchDetalleFactura = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const {activo} = req.body
        const DetalleFactura = await detalleFacturasServices.getDetalleFacturaById(id)
        if(!DetalleFactura){
            res.status(404).json({ error: `Error al encontrar el DetalleFactura con id: ${id}` })
            return
        } else{
            const updatedDetalleFactura = await detalleFacturasServices.patchDetalleFactura(activo, id)
            if(!updatedDetalleFactura){
                res.status(404).json({error: "error al patchear el DetalleFactura"})
            }else{
                res.status(200).json(utils.convertBigIntFields(updatedDetalleFactura))
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


