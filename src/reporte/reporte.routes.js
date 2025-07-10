import { Router } from "express";
import { agregarReporte, eliminarReporte, getReportePorId, reportesPorUsuario, todosLosReportes} from "./reporte.controller.js";
//import { validateTokenJWT } from "../../middlewares/validate.jwt.js";

const apiReport = Router()

apiReport.post('/agregar', agregarReporte)
apiReport.delete('/eliminar/:id', eliminarReporte)
apiReport.get('/todosLosReportes', todosLosReportes)
apiReport.get('/reporte-por-usuario', reportesPorUsuario)
apiReport.get('/reportePorId/:id', getReportePorId)

export default apiReport