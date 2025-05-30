import { prisma } from '../db/client'

export const getAllCountries = () => prisma.pais.findMany()

export const getCountryById = (id : number) => prisma.pais.findUnique({where : {id}})

export const updateCountry = (
    data: {
        nombre : string,
        activo : boolean,
        provincia : number[] // Array de ids de provincia
    }, id : number
) => {
    const { provincia, ...paisData} = data

    return prisma.pais.update({
        where : {id},
        data : {
            ...paisData,
            provincia : {
                set : provincia.map((provinciaId) => ({id: provinciaId})) // Cambia el array de provincias
            }
        }
    })
}

export const patchCountry = (activo : boolean, id : number) => {
    return prisma.pais.update({where : {id},
    data : {activo}})
}