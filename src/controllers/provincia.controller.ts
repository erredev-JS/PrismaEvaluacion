import { Request, Response } from 'express'
import * as utils from '../utils/utils'
import * as provinciaService from '../services/provincia.service' 

export const getAllProvinces = async(req : Request, res : Response) => {
    try {
        const provincias = await provinciaService.getAllProvinces()
        res.status(200).json(utils.convertBigIntFields(provincias))
        return
    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        } else {
            res.status(500).json({error : 'Error desconocido'})
        }
    }
}

export const getProvinceById = async (req : Request, res : Response) => {
    const id = Number(req.params.id)
    try {
        const provincia = await provinciaService.getProvinceById(id)
        if (!provincia){
            res.status(404).json({error : 'Provincia no encontrada'})
            return
        } else {
            res.status(200).json(utils.convertBigIntFields(provincia))
            return
        }

    } catch (error : unknown) {
        if (error instanceof Error) {
            res.status(500).json({error : error.message})
            return
        }else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const createProvince = async( req : Request, res : Response) => {
    const {nombre, pais_id, activo} = req.body

    if (!nombre || !pais_id || !activo){
        res.status(400).json({error : 'Faltan atributos en el body'})
        return
    }

    try {
        const newProvince = await provinciaService.createProvince({nombre, activo, pais_id})
        res.status(201).json(utils.convertBigIntFields(newProvince))

    } catch (error : unknown) {

        if (error instanceof Error) {
            res.status(500).json({error : error.message})
            return
        }else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}

export const updateProvince = async (req: Request, res: Response) => {
    const id = Number(req.params.id); // Asegúrate de que este tipo coincida con el modelo
    const { nombre, activo, localidad, pais_id } = req.body;

    if (!nombre || typeof activo === "undefined" || !pais_id) {
        res.status(400).json({ error: "Faltan atributos necesarios en el body" });
        return;
    }

    try {
        console.log("ID recibido:", id);
        const provincia = await provinciaService.getProvinceById(id);
        console.log("Provincia encontrada:", provincia);

        if (!provincia) {
            res.status(404).json({ error: "Provincia no encontrada" });
            return;
        }

        const updatedProvincia = await provinciaService.updateProvince(
            { nombre, activo, localidad, pais: pais_id },
            id
        );

        res.status(200).json(utils.convertBigIntFields(updatedProvincia));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error al actualizar provincia:", error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
};

export const patchProvince = async (req : Request,res: Response) => {
    const id = Number(req.params.id)
    try {

        const body = Boolean(req.body)

        const provincia = await provinciaService.getProvinceById(id)
        if (!provincia) {
            res.status(404).json({error : 'Provincia no encontrado'})
            return
        } else {
            const updatedProvincia = await provinciaService.patchProvince(body, id)
            if (!updatedProvincia) {
                res.status(400).json({error : 'Error al patchear la provincia'})
                return
            } else {
                res.status(200).json(utils.convertBigIntFields(updatedProvincia))
                return
            }
        }


    } catch (error : unknown) {
        if (error instanceof Error) {
            res.status(500).json({error : error.message})
            return
        }else {
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }
}