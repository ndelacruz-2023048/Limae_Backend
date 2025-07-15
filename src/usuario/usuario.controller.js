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

export const getUsuariosAdmins = async (req, res) => {
    try {
        const admins = await Usuario.find({ rol: 'ADMIN' })
        res.status(200).json({
            message: 'Usuarios ADMIN obtenidos correctamente',
            admins: admins,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios ADMIN',
            error: error.message,
        })
    }
}