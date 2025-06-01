import { prisma } from '../db/client'

export const createDescuento = (data: {
  fecha_desde?: Date
  fecha_hasta?: Date
  descripcion?: string
  promocion_precio?: number
  tiempo_desde?: Date
  tiempo_hasta?: Date
  nombre?: string
  activo?: boolean
}) => {
  return prisma.descuentos.create({ data })
}

export const getAllDescuentos = () => {
  return prisma.descuentos.findMany()
}

export const getDescuentoById = (id: number | bigint) => {
  return prisma.descuentos.findUnique({ where: { id } })
}

export const updateDescuento = (
  data: {
    fecha_desde?: Date
    fecha_hasta?: Date
    descripcion?: string
    promocion_precio?: number
    tiempo_desde?: Date
    tiempo_hasta?: Date
    nombre?: string
    activo?: boolean
  },
  id: number | bigint
) => {
  return prisma.descuentos.update({
    where: { id },
    data
  })
}

export const patchDescuento = (activo: boolean, id: number | bigint) => {
  return prisma.descuentos.update({
    where: { id },
    data: { activo }
  })
}
