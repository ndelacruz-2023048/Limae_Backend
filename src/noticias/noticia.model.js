import { Schema, model } from 'mongoose'

const noticiaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      maxLength: [250, 'El título no puede ser mayor de 250 caracteres'],
    },
    entrada: {
      type: String,
      required: [true, 'La entrada es obligatoria'],
      maxLength: [500, 'La entrada no puede ser mayor de 500 caracteres'],
    },
    cuerpo: {
      type: String,
      required: [true, 'El cuerpo de la noticia es obligatorio'],
      maxLength: [10000, 'El cuerpo no puede ser mayor de 10000 caracteres'],
    },
    fotografia: {
      type: String,
      default: ''
    },
    cita: {
      type: String,
      maxLength: [500, 'La cita no puede ser mayor de 500 caracteres'],
      default: ''
    },
    etiquetas: [
      {
        type: String,
        maxLength: [50, 'Cada etiqueta no puede ser mayor de 50 caracteres'],
        trim: true
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Noticia', noticiaSchema)
