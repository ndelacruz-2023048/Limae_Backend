import { Schema, model } from "mongoose";

const esquemaReporte = Schema(
    {
        numeroReporte: {
            type: String,
            required: [true, 'El número de reporte es obligatorio'],
            maxLength: [50, 'El número de reporte no puede ser mayor de 50 caracteres'],
        },
        descripcion: {
            type: String,
            required: [true, 'La descripción es obligatoria'],
            maxLength: [1000, 'La descripción no puede ser mayor de 1000 caracteres'],
        },
        tipoDeReporte: {
            type: String,
            enum: [
                'AcosoVerbal',
                'ViolenciaEstudiantilContraDocentes',
                'ViolenciaSexual',
                'ViolenciaEscolarEstructural',
                'ViolenciaPorGenero',
            ],
            required: [true, 'El tipo de reporte es obligatorio'],
        },
        //es el que esta logeado
        usuarioQueHizoElReporte: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            //required: [true, 'El usuario que hizo el reporte es obligatorio'],
            default: '686eac3233b7f1df9fe16c73'
        },
        //Se debería encontrar al usuario de Rafael y se manda su id
        usuarioQueRealizaraElSeguimiento: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            //required: [true, 'El usuario para el seguimiento es obligatorio'],
            default: '686eac3233b7f1df9fe16c73'
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

export default model('Reporte', esquemaReporte)
