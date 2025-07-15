import { Router } from 'express'
import {
  crearFormulario,
  listarFormularios,
  editarFormulario,
  eliminarFormulario
} from '../formularios/formulario.controller.js'

const forms = Router()

forms.post('/quiz', crearFormulario)
forms.get('/quiz/list', listarFormularios)
forms.put('/quiz/:id', editarFormulario)
forms.delete('/quiz/:id', eliminarFormulario)

export default forms