import Cuestionario from '../formularios/formulario.model.js'
import Pregunta from '../formularios/preguntas.model.js'
import Respuesta from '../formularios/respuestas.model.js'

// Crear cuestionario con 3 preguntas
export const crearCuestionario = async (req, res) => {
  const { titulo, preguntas } = req.body

  try {
    if (!titulo || !Array.isArray(preguntas) || preguntas.length !== 3) {
      return res.status(400).send({
        success: false,
        message: 'Debes enviar un título y exactamente 3 preguntas'
      })
    }

    const preguntasCreadas = await Promise.all(
      preguntas.map(async ({ pregunta }) => {
        const nuevaPregunta = new Pregunta({ pregunta })
        return await nuevaPregunta.save()
      })
    )

    const nuevoCuestionario = new Cuestionario({
      titulo,
      preguntas: preguntasCreadas.map(p => p._id)
    })

    await nuevoCuestionario.save()

    return res.status(200).send({
      success: true,
      message: 'Cuestionario creado correctamente',
      cuestionario: nuevoCuestionario
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al crear el cuestionario',
      error
    })
  }
}

// Listar todos los cuestionarios
export const listarCuestionarios = async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find()
      .populate('preguntas')
      .sort({ createdAt: -1 })

    console.log('Cuestionarios encontrados:', cuestionarios)

    if (!cuestionarios.length) {
      return res.status(404).send({
        success: false,
        message: 'No se encontraron cuestionarios'
      })
    }

    const cuestionariosConRespuestas = await Promise.all(
      cuestionarios.map(async (cuestionario) => {
        const respuestas = await Respuesta.find({ cuestionario: cuestionario._id })
          .populate('respuestas.pregunta', 'pregunta')
          .select('-__v -updatedAt')

        return {
          ...cuestionario.toObject(),
          respuestasEnviadas: respuestas
        }
      })
    )

    return res.send({
      success: true,
      message: 'Cuestionarios encontrados',
      cuestionarios: cuestionariosConRespuestas
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al listar los cuestionarios',
      error
    })
  }
}
