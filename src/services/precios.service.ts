import { prisma } from '../db/client'

export const createPrice = (data : {
    precio_compra: number,
    precio_venta: number,
    descuento_id: number,
    activo: boolean,
}) => prisma.precios.create({data})

export const getAllPrices = () => prisma.precios.findMany()

export const getPriceById = (id: number) => prisma.precios.findUnique({where: {id}})

export const updatePrice = (id: number, data: {
     precio_compra: number,
    precio_venta: number,
    descuento_id: number,
    activo: boolean,
}) => prisma.precios.update({where: {id}, data})

export const patchPrice = (id: number, activo: boolean) => prisma.precios.update({where: {id}, data: {activo}})