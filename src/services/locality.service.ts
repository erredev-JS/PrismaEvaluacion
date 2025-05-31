import { prisma } from "../db/client";

export const getAllLocalities = () => prisma.localidad.findMany()

export const getLocalityById = (id : number) => prisma.localidad.findUnique({where : {id}})

export const createLocality = async(data : {
    nombre : string,
    provincia_id : number,
    activo : boolean

}) => {
    const {provincia_id, ...localityData} = data 

    const existingProvince = await prisma.provincia.findUnique({
        where : {id : provincia_id}
    })

    console.log(existingProvince);
    

    if (!existingProvince) {
        throw new Error (`La provincia con id : ${provincia_id} no existe`)
    }

    return prisma.localidad.create({
        data : {
            ...localityData,
            provincia : {
                connect: {id : provincia_id}
            },
            direccion : {
                // Se crea array vacio
            }
        }
    })
}

export const updateLocality = async(
    data : {
        nombre : string,
        provincia: number,
        activo : boolean,
        direccion : number[]
    } , id : number
) => {
    const {direccion,provincia, ...localityData} = data

    const existingProvince = await prisma.provincia.findUnique({
        where : {id : provincia}
    })

    if (!existingProvince){
        throw new Error (`La provincia con id : ${provincia} no existe`)
    }

    const existingAddresses = await prisma.direccion.findMany({
        where : {id : {in: direccion}},
        select : {id : true},
    })

    if (existingAddresses.length !== direccion.length){
        throw new Error (
            `Algunas direcciones existentes ${direccion.filter(
                (id) => !existingAddresses.some((d) => d.id === BigInt(id))
            ).join(", ")}`
        )
    }

    return prisma.localidad.update({
        where : {id},
        data : {
            ...localityData,
            direccion : {
                set : direccion.map((direccionId) => ({id : direccionId}))
            },
            provincia : {
                connect : {id : provincia}
            }
        }
    })
}

export const patchLocality = (activo : boolean, id: number) => {
    return prisma.localidad.update({where : {id}, data : {activo}})
}