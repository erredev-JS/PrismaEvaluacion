import { Request, Response } from "express"
import * as localityService from '../services/locality.service'
import * as utils from '../utils/utils'


export const getAllLocalities = async (req : Request, res : Response) =>{
    try {
        const localities = await localityService.getAllLocalities()
        res.status(200).json(utils.convertBigIntFields(localities))
        return
    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        }else{
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }

}

export const getLocalityById = async (req : Request, res : Response) =>{

    const id = Number(req.params.id)

    try {
        const locality = await localityService.getLocalityById(id)
        if (!locality){
            res.status(404).json({error : 'No se encontro la localidad'})
            return

        } else {
            res.status(200).json(utils.convertBigIntFields(locality))
            return
        }

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        }else{
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }

}

export const createLocality = async (req : Request, res : Response) =>{

    const {nombre, provincia_id, activo} = req.body
   
    if (!nombre || !provincia_id || !activo){
        res.status(400).json({error : 'Faltan atributos en el body'})
        return
    }

    try {
        const newLocality = await localityService.createLocality({nombre, activo, provincia_id})
        res.status(201).json(utils.convertBigIntFields(newLocality))

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        }else{
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }

}

export const updateLocality = async (req : Request, res : Response) =>{
    const id = Number(req.params.id); 
        const { nombre, activo, direccion, provincia } = req.body;
    
        // Validar que los campos requeridos están presentes
        if (!nombre || typeof activo === "undefined" || !direccion || !provincia) {
            res.status(400).json({ error: "Faltan atributos necesarios en el body" });
            return;
        }
    
        try {
            
            const locality = await localityService.getLocalityById(id);
            if (!locality) {
                res.status(404).json({ error: "Localidad no encontrada" });
                return;
            }
    
            
            const updatedLocality = await localityService.updateLocality(
                { nombre, activo, direccion, provincia },
                id
            );
    
            if (!updatedLocality) {
                res.status(400).json({ error: "Error al actualizar localidad" });
                return;
            }
    
            res.status(200).json(utils.convertBigIntFields(updateLocality));
            return; 


    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        }else{
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }

}

export const patchLocality = async (req : Request, res : Response) =>{
    const id = Number(req.params.id)
        try {
    
            const body = Boolean(req.body)
            const locality = await localityService.getLocalityById(id)

            if (!locality) {
                res.status(404).json({error : 'Localidad no encontrado'})
                return

            } else {

                const updatedLocality = await localityService.patchLocality(body, id)
                if (!updateLocality) {
                    res.status(400).json({error : 'Error al patchear la localidad'})
                    return
                } else {
                    res.status(200).json(utils.convertBigIntFields(updatedLocality))
                    return
                }
            }    

    } catch (error : unknown) {
        if (error instanceof Error){
            res.status(500).json({error : error.message})
            return
        }else{
            res.status(500).json({error : 'Error desconocido'})
            return
        }
    }

}