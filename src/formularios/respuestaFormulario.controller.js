import Repuesta from '../formularios/respuestas.model.js'
import Cuestionario from '../formularios/formulario.model.js'

// Responder un cuestionario
export const responderCuestionario = async (req, res) => {
  const { nombreUsuario, cuestionario, respuestas } = req.body

  try {
    if (!nombreUsuario || !cuestionario || !Array.isArray(respuestas) || respuestas.length !== 3) {
      return res.status(400).send({
        success: false,
        message: 'Debes enviar nombre, id de cuestionario y exactamente 3 respuestas'
      })
    }

    // Verificar que el cuestionario existe
    const cuestionarioEncontrado = await Cuestionario.findById(cuestionario).populate('preguntas')
    if (!cuestionarioEncontrado) {
      return res.status(404).send({
        success: false,
        message: 'Cuestionario no encontrado'
      })
    }

    // Validar que las respuestas coincidan con las preguntas
    const preguntasCuestionario = cuestionarioEncontrado.preguntas.map(p => p._id.toString())
    const respuestasValidas = respuestas.every(r => preguntasCuestionario.includes(r.pregunta))

    if (!respuestasValidas) {
      return res.status(400).send({
        success: false,
        message: 'Las respuestas no coinciden con las preguntas del cuestionario'
      })
    }

    const nuevaRespuesta = new Repuesta({
      nombreUsuario,
      cuestionario,
      respuestas
    })

    await nuevaRespuesta.save()

    return res.send({
      success: true,
      message: 'Cuestionario respondido exitosamente',
      respuesta: nuevaRespuesta
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al responder el cuestionario',
      error
    })
  }
}
