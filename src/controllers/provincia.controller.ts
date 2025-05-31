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
    const id = Number(req.params.id); // Convertir a BigInt si es necesario
    const { nombre, activo, localidad, pais } = req.body;

    // Validar que los campos requeridos están presentes
    if (!nombre || !activo || !localidad || !pais) {
        res.status(400).json({ error: "Faltan atributos necesarios en el body" });
        return;
    }

    try {
        
        const provincia = await provinciaService.getProvinceById(id);
        if (!provincia) {
            res.status(404).json({ error: "Provincia no encontrada" });
            return;
        }

        
        const updatedProvincia = await provinciaService.updateProvince(
            { nombre, activo, localidad, pais },
            id
        );

        if (!updatedProvincia) {
            res.status(400).json({ error: "Error al actualizar provincia" });
            return;
        }

        res.status(200).json(utils.convertBigIntFields(updatedProvincia));
        return;
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
};

export const patchProvince = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { activo } = req.body;

    // Validar que el atributo activo está presente y es booleano
    if (typeof activo !== 'boolean') {
        res.status(400).json({ error: 'Falta el atributo "activo" o no es booleano' });
        return;
    }

    try {
        const provincia = await provinciaService.getProvinceById(id);
        if (!provincia) {
            res.status(404).json({ error: 'Provincia no encontrada' });
            return;
        }

        const updatedProvincia = await provinciaService.patchProvince(activo, id);
        if (!updatedProvincia) {
            res.status(400).json({ error: 'Error al patchear la provincia' });
            return;
        }

        res.status(200).json(utils.convertBigIntFields(updatedProvincia));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error desconocido' });
        }
    }
};