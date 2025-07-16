import { Router } from 'express'
import {
  responderCuestionario
} from '../formularios/respuestaFormulario.controller.js'

const respuestaRoutes = Router()

// Responder un cuestionario existente
respuestaRoutes.post('/quiz/responder', responderCuestionario)

export default respuestaRoutes