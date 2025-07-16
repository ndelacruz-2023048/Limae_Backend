import { Schema, model } from 'mongoose'

const cuestionarioSchema = Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título del cuestionario es obligatorio'],
      maxLength: [150, 'El título no puede superar los 150 caracteres'],
    },
    preguntas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true
      }
    ],
    creadoPor: {
      type: String,
      default: 'ADMIN'
    }
  }
)

export default model('Cuestionario', cuestionarioSchema)