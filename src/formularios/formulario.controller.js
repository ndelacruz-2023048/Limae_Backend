import Formulario from '../formularios/formulario.model.js'
import Pregunta from '../formularios/preguntas.model.js'

// Crear formulario con 3 preguntas
export const crearFormulario = async (req, res) => {
  const { nombreUsuario, preguntas } = req.body

  try {
    if (!nombreUsuario || !Array.isArray(preguntas) || preguntas.length !== 3) {
      return res.status(400).send({
        success: false,
        message: 'Debes enviar un nombre de usuario y exactamente 3 preguntas con sus respuestas'
      })
    }

    // Crear preguntas primero
    const preguntasCreadas = await Promise.all(
      preguntas.map(async ({ pregunta, respuesta }) => {
        const nuevaPregunta = new Pregunta({ pregunta, respuesta })
        return await nuevaPregunta.save()
      })
    )

    // Crear formulario
    const nuevoFormulario = new Formulario({
      nombreUsuario,
      preguntas: preguntasCreadas.map(p => p._id)
    })

    await nuevoFormulario.save()

    return res.status(200).send({
      success: true,
      message: 'Formulario creado correctamente',
      formulario: nuevoFormulario
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al crear el formulario',
      error
    })
  }
}

// Listar todos los formularios
export const listarFormularios = async (req, res) => {
  try {
    const formularios = await Formulario.find()
      .populate('preguntas')
      .sort({ createdAt: -1 })

    if (!formularios.length) {
      return res.status(404).send({
        success: false,
        message: 'No se encontraron formularios'
      })
    }

    return res.send({
      success: true,
      message: 'Formularios encontrados',
      formularios
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al listar los formularios',
      error
    })
  }
}

// Editar formulario y sus preguntas
export const editarFormulario = async (req, res) => {
  const { id } = req.params
  const { nombreUsuario, preguntas } = req.body

  try {
    const formulario = await Formulario.findById(id)

    if (!formulario) {
      return res.status(404).send({ success: false, message: 'Formulario no encontrado' })
    }

    // Validar preguntas
    if (!Array.isArray(preguntas) || preguntas.length !== 3) {
      return res.status(400).send({
        success: false,
        message: 'Debes enviar exactamente 3 preguntas'
      })
    }

    // Actualizar preguntas
    for (let i = 0; i < 3; i++) {
      const preguntaId = formulario.preguntas[i]
      await Pregunta.findByIdAndUpdate(preguntaId, preguntas[i])
    }

    // Actualizar nombre
    formulario.nombreUsuario = nombreUsuario
    await formulario.save()

    return res.send({
      success: true,
      message: 'Formulario actualizado correctamente',
      formulario
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al editar el formulario',
      error
    })
  }
}

// Eliminar formulario y sus preguntas
export const eliminarFormulario = async (req, res) => {
  const { id } = req.params

  try {
    const formulario = await Formulario.findById(id)

    if (!formulario) {
      return res.status(404).send({ success: false, message: 'Formulario no encontrado' })
    }

    // Eliminar preguntas
    await Pregunta.deleteMany({ _id: { $in: formulario.preguntas } })

    // Eliminar formulario
    await Formulario.findByIdAndDelete(id)

    return res.send({
      success: true,
      message: 'Formulario eliminado correctamente'
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error al eliminar el formulario',
      error
    })
  }
}