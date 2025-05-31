import { prisma } from "../db/client";


export const getAllProvinces = () => prisma.provincia.findMany()

export const getProvinceById = (id : number) => prisma.provincia.findUnique({where: {id}})

export const createProvince = async(data : {
    nombre : string,
    pais_id : number,
    activo : boolean,

}) => {
    const {pais_id, ...provinceData} = data

    const existCountry = await prisma.pais.findUnique({
        where : {id : pais_id}
    })

    if (!existCountry) {
        throw new Error (`El pais con id: ${pais_id} no existe`)
    }

    return prisma.provincia.create({
        data : {
            ...provinceData,
            pais : {
                connect: {id : pais_id} // Relaciono la provincia con el pais
            },
            localidad : {
                // Se crea array vacio
            }
        }
    })
}

export const updateProvince = async (
    data : {
        nombre : string,
        activo : boolean,
        localidad : number[] // Arrays de id de localidades
        pais : number
    }, id : number
) => {
    const {localidad, pais, ...provinciaData} = data

    const existCountry = await prisma.pais.findUnique({
        where : {id : pais}
    })

    if (!existCountry) {
        throw new Error (`El pais con id: ${pais} no existe`)
    }
    
    const existingLocalities = await prisma.localidad.findMany({
        where: { id: { in: localidad } },
        select: { id: true },
    })

    if (existingLocalities.length !== localidad.length) {
        throw new Error(
            `Algunas localidades no existen: ${localidad.filter(
                (id) => !existingLocalities.some((l) => l.id === BigInt(id))
            ).join(", ")}`
        );
    }

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