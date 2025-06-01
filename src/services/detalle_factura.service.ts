import { prisma } from '../db/client'

export const createDetalleFactura = (data:{
    monto: number,
    cantidad: number,
    subtotal: number,
    precio_unitario: number,
    factura_id:number,
    producto_id: number,
    activo: boolean
    
}) => prisma.detalle_factura.create({data})


export const getAllDetalleFactura = () => prisma.detalle_factura.findMany()

export const getDetalleFacturaById = (id:number) => prisma.detalle_factura.findUnique({where:{id}})

export const updateDetalleFactura = (data:{
    monto: number,
    cantidad: number,
    subtotal: number,
    precio_unitario: number,
    factura_id:number,
    producto_id: number,
    activo: boolean
    
}, id:number
) => {
    return prisma.detalle_factura.update({
        where:{id},
        data
    })
}

export const patchDetalleFactura = (activo: boolean, id:number) => {
    return prisma.detalle_factura.update({
        where:{id}, 
        data:{activo}
    })
}