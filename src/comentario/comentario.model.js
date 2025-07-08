import { Schema, model } from "mongoose";

const esquemaComentario = Schema(
    {
        texto: {
            type: String,
            required: [true, 'El contenido del comentario es obligatorio'],
            maxLength: [300, 'El comentario no puede exceder los 300 caracteres'],
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El usuario es obligatorio para el comentario'],
        },
        reporte: {
            type: Schema.Types.ObjectId,
            ref: 'Reporte',
            required: [true, 'El reporte al que pertenece el comentario es obligatorio'],
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

export default model('Comentario', esquemaComentario);
