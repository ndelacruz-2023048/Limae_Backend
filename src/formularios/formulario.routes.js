import { Router } from 'express'
import {
  crearCuestionario,
  listarCuestionarios
} from '../formularios/formulario.controller.js'

const formularioRoutes = Router()

// Crear un nuevo cuestionario con preguntas
formularioRoutes.post('/quiz', crearCuestionario)

// Listar todos los cuestionarios disponibles
formularioRoutes.get('/quiz/list', listarCuestionarios)

export default formularioRoutes
