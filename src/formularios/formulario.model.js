import { Schema, model } from 'mongoose'

const formulario = Schema(
  {
    nombreUsuario: {
      type: String,
      required: [true, 'El nombre del usuario es obligatorio'],
      maxLength: [100, 'El nombre no puede superar los 100 caracteres'],
    },
    preguntas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Formulario', formulario)