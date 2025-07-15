import { Schema, model } from 'mongoose'

const pregunta = Schema(
  {
    pregunta: {
      type: String,
      required: [true, 'La pregunta es obligatoria'],
      maxLength: [500, 'La pregunta no puede superar los 500 caracteres'],
    },
    respuesta: {
      type: String,
      required: [true, 'La respuesta es obligatoria'],
      maxLength: [1000, 'La respuesta no puede superar los 1000 caracteres'],
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Pregunta', pregunta)