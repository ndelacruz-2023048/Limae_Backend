import { Router } from "express";
import { agregarReporte, eliminarReporte, todosLosReportes} from "./reporte.controller.js";
//import { validateJwt } from "../../middlewares/validate.jwt.js";

const apiReport = Router()

apiReport.post('/agregar', agregarReporte)
apiReport.delete('/eliminar/:id', eliminarReporte)
apiReport.get('/todosLosReportes', todosLosReportes)

export default apiReport