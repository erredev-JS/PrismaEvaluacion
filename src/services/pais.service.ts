import { prisma } from '../db/client'

export const getAllCountries = () => prisma.pais.findMany({
    include:{
        provincia:{
            include: {
                localidad:true
            }
        }
    }
})

export const getCountryById = (id : number) => prisma.pais.findUnique({where : {id},
    include:{
        provincia:{
            include: {
                localidad:true
            }
        }
    }
})

export const createCountry = (data: {
    nombre: string;
    activo: boolean;
}) => {
    return prisma.pais.create({
        data: {
            ...data,
            provincia: {
                // Se crea con provincias vacias
            },
        },
    });
};



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
            ...data,
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