import { Schema, model } from 'mongoose'

const respuestaSchema = Schema(
  {
    nombreUsuario: {
      type: String,
      required: [true, 'El nombre del usuario es obligatorio'],
      maxLength: [100, 'El nombre no puede superar los 100 caracteres'],
    },
    cuestionario: {
      type: Schema.Types.ObjectId,
      ref: 'Cuestionario',
      required: true,
    },
    respuestas: [
      {
        pregunta: {
          type: Schema.Types.ObjectId,
          ref: 'Pregunta',
          required: true
        },
        respuesta: {
          type: String,
          required: [true, 'La respuesta es obligatoria'],
          maxLength: [1000, 'La respuesta no puede superar los 1000 caracteres'],
        }
      }
    ]
  }
)

export default model('Respuesta', respuestaSchema)