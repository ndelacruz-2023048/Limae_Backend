import { Schema, model } from 'mongoose';

const esquemaContadorReporte = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      default: 'contadorReportes',
    },
    valor: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('ContadorReporte', esquemaContadorReporte);
