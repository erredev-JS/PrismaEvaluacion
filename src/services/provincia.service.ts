import { prisma } from "../db/client";


export const getAllProvinces = () => prisma.provincia.findMany()

export const getProvinceById = (id : number) => prisma.provincia.findUnique({where: {id}})

export const updateProvince = (
    data : {
        nombre : string,
        activo : boolean,
        localidad : number[] // Arrays de id de localidades
        pais : number
    }, id : number
) => {
    const {localidad, pais, ...provinciaData} = data

    return prisma.provincia.update({
        where : {id},
        data : {
            ...provinciaData,
            localidad : {
                set : localidad.map((localidadId) => ({id : localidadId}))
            }, 
            pais : {
                connect : {id : pais}
            }
        }
    })
}

export const patchProvince = (activo : boolean, id : number) => {
    return prisma.provincia.update({where : {id}, data : {activo} })
}