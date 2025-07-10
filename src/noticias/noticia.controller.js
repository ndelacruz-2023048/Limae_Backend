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
    const { limit = 10, skip = 0, etiqueta } = req.query;

    const filtro = etiqueta ? { etiquetas: { $in: [etiqueta] } } : {};

    let noticias = await Noticia.find(filtro)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Si no hay noticias, se crea una por defecto y se guarda
    if (noticias.length === 0) {
  const noticiaPorDefecto = new Noticia({
    titulo: "La violencia y su impacto en la sociedad",
    entrada: "La violencia es un problema que afecta a muchas comunidades alrededor del mundo.",
    descripcion: "Un análisis profundo sobre las causas y consecuencias de la violencia en nuestra sociedad.",
    cuerpo: [
      "La violencia es un fenómeno complejo que afecta la salud física y emocional de las personas.",
      "Se manifiesta en diversas formas, incluyendo la violencia doméstica, la violencia callejera y la violencia institucional.",
      "Es fundamental promover la educación, el diálogo y políticas públicas efectivas para reducir su impacto.",
      "La sociedad debe trabajar unida para crear entornos seguros y saludables para todos."
    ].join('\n'),
    fotografia: "https://res.cloudinary.com/dtmwybty7/image/upload/v1752125807/f0eed078-ed59-4e5c-830d-fc21cca5b922_fvxijs.jpg",
    autor: "Equipo de Redacción",
    fecha: new Date(),
    etiquetas: ["Violencia", "Sociedad", "Prevención"]
  });

  await noticiaPorDefecto.save();

  noticias = [noticiaPorDefecto];
}



    return res.send({
      success: true,
      noticias
    });

  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return res.status(500).send({
      success: false,
      message: 'Error general al obtener las noticias',
      error
    });
  }
};


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
