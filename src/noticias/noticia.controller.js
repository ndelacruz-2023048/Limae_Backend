import Noticia from './noticia.model.js'

export const agregarNoticia = async (req, res) => {
  try {
    const datos = req.body

    if (datos.etiquetas && !Array.isArray(datos.etiquetas)) {
      return res.status(400).send({
        success: false,
        message: 'El campo "etiquetas" debe ser un arreglo'
      })
    }

    const nuevaNoticia = new Noticia({
      ...datos,
      etiquetas: datos.etiquetas || []
    })

    await nuevaNoticia.save()

    return res.status(201).send({
      success: true,
      message: 'Noticia agregada correctamente',
      noticia: nuevaNoticia
    })
  } catch (error) {
    console.error('Error al agregar noticia:', error)
    return res.status(500).send({
      success: false,
      message: error.message || 'Error al agregar la noticia'
    })
  }
}

export const eliminarNoticia = async (req, res) => {
  try {
    const { id } = req.params

    const noticia = await Noticia.findById(id)
    if (!noticia) {
      return res.status(404).send({
        success: false,
        message: 'No se encontró la noticia'
      })
    }

    await Noticia.findByIdAndDelete(id)

    return res.send({
      success: true,
      message: 'Noticia eliminada correctamente'
    })
  } catch (error) {
    console.error('Error al eliminar noticia:', error)
    return res.status(500).send({
      success: false,
      message: 'Error general al eliminar la noticia',
      error
    })
  }
}

export const todasLasNoticias = async (req, res) => {
  try {
    const { limit = 10, skip = 0, etiqueta } = req.query

    const filtro = etiqueta ? { etiquetas: { $in: [etiqueta] } } : {}

    const noticias = await Noticia.find(filtro)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    if (noticias.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No se encontraron noticias'
      })
    }

    return res.send({
      success: true,
      noticias
    })
  } catch (error) {
    console.error('Error al obtener noticias:', error)
    return res.status(500).send({
      success: false,
      message: 'Error general al obtener las noticias',
      error
    })
  }
}

export const noticiaPorId = async (req, res) => {
  try {
    const { id } = req.params

    const noticia = await Noticia.findById(id)
    if (!noticia) {
      return res.status(404).send({
        success: false,
        message: 'No se encontró la noticia'
      })
    }

    return res.send({
      success: true,
      noticia
    })
  } catch (error) {
    console.error('Error al obtener noticia por ID:', error)
    return res.status(500).send({
      success: false,
      message: 'Error al obtener la noticia',
      error
    })
  }
}

export const actualizarNoticia = async (req, res) => {
  try {
    const { id } = req.params
    const datos = req.body

    if (datos.etiquetas && !Array.isArray(datos.etiquetas)) {
      return res.status(400).send({
        success: false,
        message: 'El campo "etiquetas" debe ser un arreglo'
      })
    }

    const noticiaActualizada = await Noticia.findByIdAndUpdate(id, datos, {
      new: true,
      runValidators: true
    })

    if (!noticiaActualizada) {
      return res.status(404).send({
        success: false,
        message: 'No se encontró la noticia para actualizar'
      })
    }

    return res.send({
      success: true,
      message: 'Noticia actualizada correctamente',
      noticia: noticiaActualizada
    })
  } catch (error) {
    console.error('Error al actualizar noticia:', error)
    return res.status(500).send({
      success: false,
      message: 'Error al actualizar la noticia',
      error
    })
  }
}
