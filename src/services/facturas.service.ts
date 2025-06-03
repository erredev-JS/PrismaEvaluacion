import { prisma } from '../db/client'


export const createBill = (data: {
        fecha_compra: Date, 
        total: number, 
        usuario_id: number, 
        activo: boolean,
        direccion_comprador: string, 
        dni_comprador: string, 
        nombre_comprador: string,
        detalle_factura?: {
            monto: number, 
            cantidad: number,
            subtotal: number,
            precio_unitario: number,
            producto_id: number,
            activo: boolean
        }[], 
    }) => prisma.factura.create({data:{
        fecha_compra: data.fecha_compra,
		total: data.total,
		usuario_id: data.usuario_id,
		activo: data.activo,
		direccion_comprador: data.direccion_comprador,
		dni_comprador: data.dni_comprador,
		nombre_comprador: data.nombre_comprador,
		...(data.detalle_factura && { detalle_factura: { create: data.detalle_factura } })
    },
    include:{
        detalle_factura: true
    }
})

export const getAllBills = () => prisma.factura.findMany({
    include:{
        detalle_factura: {
            include:{
                productos:true
            }
        }
    }
})

export const getBillById = (id: number) => prisma.factura.findUnique({where: {id},
                    include:{
                        detalle_factura:{
                            include:{
                                productos: true
                            }
                        }
                    }})

export const updateBill = (
    data: {
        fecha_compra: Date, 
        total: number, 
        usuario_id: number, 
        activo: boolean,
        direccion_comprador: string, 
        dni_comprador: string, 
        nombre_comprador: string,
        
    }, id: number
) => {
    return prisma.factura.update({
        where: {id},
        data
    })
}

export const patchFactura = (activo: boolean, id: number) => {
    return prisma.factura.update({
    where: {id},
    data: {activo}})
}