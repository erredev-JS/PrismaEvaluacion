import { Request, Response } from 'express'
import * as descuentosServices from '../services/descuentos.service'
import * as utils from '../utils/utils'

export const postDescuento = async (req: Request, res: Response) => {
  try {
    const {
      fecha_desde,
      fecha_hasta,
      descripcion,
      promocion_precio,
      tiempo_desde,
      tiempo_hasta,
      nombre,
      activo
    } = req.body

    const body = {
      fecha_desde,
      fecha_hasta,
      descripcion,
      promocion_precio,
      tiempo_desde,
      tiempo_hasta,
      nombre,
      activo
    }

    const created = await descuentosServices.createDescuento(body)

    if (!created) {
      res.status(400).json({ error: 'Error al crear el descuento' })
      return
    }

    res.status(201).json(res.status(200).json(utils.convertDatesToISOString(utils.convertBigIntFields(created)))
)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
}

export const getAllDescuentos = async (_req: Request, res: Response) => {
  try {
    const data = await descuentosServices.getAllDescuentos()
    res.status(200).json(res.status(200).json(utils.convertDatesToISOString(utils.convertBigIntFields(data)))
)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
}

export const getDescuentoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' })
      return
    }

    const data = await descuentosServices.getDescuentoById(id)

    if (!data) {
      res.status(404).json({ error: 'Descuento no encontrado' })
      return
    }

    res.status(200).json(utils.convertDatesToISOString(utils.convertBigIntFields(data)))
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
}

export const updateDescuento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const {
      fecha_desde,
      fecha_hasta,
      descripcion,
      promocion_precio,
      tiempo_desde,
      tiempo_hasta,
      nombre,
      activo
    } = req.body

    const body = {
      fecha_desde,
      fecha_hasta,
      descripcion,
      promocion_precio,
      tiempo_desde,
      tiempo_hasta,
      nombre,
      activo
    }

    const found = await descuentosServices.getDescuentoById(id)

    if (!found) {
      res.status(404).json({ error: 'Descuento no encontrado' })
      return
    }

    const updated = await descuentosServices.updateDescuento(body, id)

    if (!updated) {
      res.status(400).json({ error: 'Error al actualizar el descuento' })
      return
    }

    res.status(200).json(utils.convertDatesToISOString(utils.convertBigIntFields(updated)))
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
}

export const patchDescuento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { activo } = req.body

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' })
      return
    }

    const found = await descuentosServices.getDescuentoById(id)

    if (!found) {
      res.status(404).json({ error: 'Descuento no encontrado' })
      return
    }

    const updated = await descuentosServices.patchDescuento(activo, id)

    if (!updated) {
      res.status(400).json({ error: 'Error al actualizar el estado del descuento' })
      return
    }

    res.status(200).json(utils.convertDatesToISOString(utils.convertBigIntFields(updated)))
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
}
