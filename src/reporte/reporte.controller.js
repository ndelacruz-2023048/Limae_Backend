import Reporte from './reporte.model.js'
import ContadorReporte from '../contador/contador.model.js'

export const agregarReporte = async (req, res) => {
  const datos = req.body
  const usuarioQueHizoElReporte = req.user.uid
  //const usuarioQueHizoElReporte = '686cc18accdbc6f2c06b93f1' ///Cambiar por el uid
  
  try {
    let contador = await ContadorReporte.findOne({ nombre: 'contadorReportes' })

    if (!contador) {
      contador = new ContadorReporte({ nombre: 'contadorReportes', valor: 0 })
      await contador.save()
    }

    const numeroReporte = `REPORTE-${contador.valor + 1}`
    contador.valor += 1
    await contador.save()

    const nuevoReporte = new Reporte({
      ...datos,
      numeroReporte: numeroReporte,
      usuarioQueHizoElReporte: usuarioQueHizoElReporte,
    })

    await nuevoReporte.save()

    return res.status(200).send({ message: 'Reporte agregado correctamente', numeroReporte })
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      success: false,
      message: error.message || 'Error agregando el reporte',
    })
  }
}

export const eliminarReporte = async (req, res) => {
  try {
    let { id } = req.params

    const reporte = await Reporte.findById(id)

    if (!reporte) {
      return res.status(404).send({
        success: false,
        message: 'No se encontró el reporte'
      })
    }

    await Reporte.findByIdAndDelete(id)

    return res.send({
      success: true,
      message: 'Reporte eliminado correctamente'
    })
  } catch (err) {
    console.error('General error', err)
    return res.status(500).send({
      success: false,
      message: 'Error general al eliminar el reporte',
      err
    })
  }
}


export const todosLosReportes = async (req, res) => {
  try {
    const { limit, skip } = req.query

    const reportes = await Reporte.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('usuarioQueHizoElReporte')
      .populate('usuarioQueRealizaraElSeguimiento')

    if (reportes.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No se encontraron reportes'
      })
    }
    console.log(reportes);
    

    return res.send({
      success: true,
      message: 'Reportes encontrados',
      reportes
    })
  } catch (err) {
    console.error('Error general', err)
    return res.status(500).send({
      success: false,
      message: err.message || 'Error general al obtener los reportes',
      err
    })
  }
}

//Obtener reporte por usuario
export const reportesPorUsuario = async (req,res)=>{
  const { userId } = req.params

  try {
    const reportes = await Reporte.find({usuarioQueHizoElReporte: userId})
      .sort({createdAt: -1})
      .populate('usuarioQueRealizaraElSeguimiento')
    
      if(reportes.length === 0){
        return res.status(404).send({
          success: false,
          message: 'No se encontraron reportes de este usuario'
        })
      }
  } catch (error) {
    console.error('Error general', error)
    return res.status(500).send({
      success: false,
      message: 'Error al obtener los reportes de usuario',
      error
    })
  }
}

//buscar reporte por id
export const getReportePorId = async (req, res)=>{
  try {
    let {id} = req.params
    const reporte = await Reporte.findById(id)

    if(!reporte)
      return res.status(404).send({
        success: false,
        message: 'No se encontro el reporte'
      })

    return res.send({
      success: true,
      message: 'Reporte encontrado: ',
      reporte
    })
  } catch (error) {
    console.error('Error general', error)
    return res.status(500).send({
      success: false,
      message: 'Error general',
      error
    })
  }
}