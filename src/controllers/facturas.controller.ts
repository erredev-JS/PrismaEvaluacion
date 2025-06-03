import { Request, Response } from 'express'

import * as facturasServices from '../services/facturas.service'

import * as utils from '../utils/utils'


export const postBill = async (req: Request, res:Response) => {
    try {
        const {
            fecha_compra,
            total,
            usuario_id,
            activo,
            direccion_comprador,
            dni_comprador,
            nombre_comprador,
            detalle_factura
        } = req.body
    
        if(!usuario_id || !total){
            res.status(400).json({error: "Faltan atributos obligatorios"})
            return
        }
        const fecha = new Date(fecha_compra)
        if (isNaN(fecha.getTime())) {
          res.status(400).json({ error: 'Fecha inválida' })
          return
        }
    
        const body = {
            fecha_compra,
            total,
            usuario_id,
            activo,
            direccion_comprador,
            dni_comprador,
            nombre_comprador,
            detalle_factura
        }
        
        const createdBill = await facturasServices.createBill(body)
        if(!createdBill) {
            res.status(400).json({error:"Error al crear la factura"})
            return
        }else{
            res.status(201).json(utils.convertBigIntFields(utils.convertDatesToISOString(createdBill)))
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

export const getAllBills = async (req:Request, res:Response) => {
    try {
        const facturas = await facturasServices.getAllBills()

        res.status(200).json(utils.convertBigIntFields(utils.convertDatesToISOString(facturas)))
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

export const getBillById = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)
        const factura = await facturasServices.getBillById(id)

        if(!factura){
            res.status(400).json({error: "Factura no encotrada"})
            return
        }else{
            res.status(200).json(utils.convertBigIntFields(utils.convertDatesToISOString(factura)))
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


export const updateBill = async (req: Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const {
            fecha_compra,
            total,
            usuario_id,
            activo,
            direccion_comprador,
            dni_comprador,
            nombre_comprador,
            detalle_factura
        } = req.body
    
        if(!usuario_id || !total){
            res.status(400).json({error: "Faltan atributos obligatorios"})
            return
        }
    
        const body = {
            fecha_compra,
            total,
            usuario_id,
            activo,
            direccion_comprador,
            dni_comprador,
            nombre_comprador,
            detalle_factura
        }
        const bill = await facturasServices.getBillById(id)
        if(!bill){
            res.status(404).json({error: "factira no encontrada"})
            return
        }

        const updatedBill = await facturasServices.updateBill(body, id)
        if(!updatedBill) {
            res.status(400).json({error:"Error al crear la factura"})
            return
        }else{
            res.status(200).json(utils.convertBigIntFields(utils.convertDatesToISOString(updatedBill)))
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


export const patchBill = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        const {activo} = req.body

        const bill = await facturasServices.getBillById(id)
        if(!bill){
            res.status(404).json({error: "Error al encontrar la factura"})
            return
        }else{
            const updatedBill = await facturasServices.patchFactura(activo, id)

            if(!updatedBill){
                res.status(400).json({error: "Error al patchear la factura"})
                return
            }else{
                res.status(200).json(utils.convertBigIntFields(utils.convertDatesToISOString(updatedBill)))
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


