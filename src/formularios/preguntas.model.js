import { Schema, model } from 'mongoose'

const preguntaSchema = Schema(
  {
    pregunta: {
      type: String,
      required: [true, 'La pregunta es obligatoria'],
      maxLength: [500, 'La pregunta no puede superar los 500 caracteres'],
    },
    respuesta: {
      type: String,
      required: false, // ❌ Ya no se responde aquí
      maxLength: [1000, 'La respuesta no puede superar los 1000 caracteres'],
    }
  }
)

export default model('Pregunta', preguntaSchema)