import express from 'express'
import * as localityController from '../controllers/loclaity.controller'

const router = express()

router.get('/', localityController.getAllLocalities)

router.get('/:id', localityController.getLocalityById)

router.post('/' , localityController.createLocality)

router.put('/:id', localityController.updateLocality)

router.patch('/:id', localityController.patchLocality)


export default router