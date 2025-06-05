import { prisma } from "../db/client";


export const getAllAddresses = () => prisma.direccion.findMany()

export const getAdressById = (id : number) => prisma.direccion.findUnique({where : {id}})

export const createAdress = async(data : {
    codigo_postal : number,
    numero : number,
    calle: string,
    user_id: number,
    localidad_id : number,
    activo : boolean

}) => {
    const {user_id, localidad_id, ...adressData} = data

    const existingUser = await prisma.usuarios.findUnique({where : {id : user_id}})
    const existingLocality = await prisma.localidad.findUnique({where : {id : localidad_id}})

    if(!existingUser){
        throw new Error (`El usuario con id : ${user_id} no existe`)
    }
    if (!existingLocality) {
        throw new Error (`La localidad con id : ${localidad_id} no existe`)
    }

    return prisma.direccion.create({
        data : {
            ...adressData,
            localidad : {
                connect : {id : localidad_id}
            },
            usuarios_direccion_user_idTousuarios : {
                connect : {id : user_id}}
        }
    })
}

export const updateAdress = async(
    data: {
        codigo_postal?: number,
        numero?: number,
        calle?: string,
        user_id?: number,
        localidad_id?: number,
        activo?: boolean
    },
    id: number
) => {
    const { user_id, localidad_id, ...adressData } = data;

    if (user_id) {
        const existingUser = await prisma.usuarios.findUnique({ where: { id: user_id } });
        if (!existingUser) {
            throw new Error(`El usuario con id: ${user_id} no existe`);
        }
    }

    if (localidad_id) {
        const existingLocality = await prisma.localidad.findUnique({ where: { id: localidad_id } });
        if (!existingLocality) {
            throw new Error(`La localidad con id: ${localidad_id} no existe`);
        }
    }

    return prisma.direccion.update({
        where: { id },
        data: {
            ...adressData,
            ...(user_id && {
                usuarios_direccion_user_idTousuarios: {
                    connect: { id: user_id }
                }
            }),
            ...(localidad_id && {
                localidad: {
                    connect: { id: localidad_id }
                }
            })
        }
    });
}

export const patchAdress = (id : number, activo : boolean) => {
    return prisma.direccion.update({where : {id}, data : {activo}})
}