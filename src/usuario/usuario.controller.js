import Usuario from "./usuario.model.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            message: 'Usuarios obtenidos correctamente',
            estudiantes: usuarios
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message
        })
    }
}
