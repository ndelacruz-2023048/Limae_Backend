import {Router} from "express";
import multer from "multer";
import { agregarNoticia, eliminarNoticia, todasLasNoticias, noticiaPorId, actualizarNoticia } from "./noticia.controller.js";

const apiNoticia = Router()
const upload = multer();

apiNoticia.post("/agregarN", agregarNoticia)
apiNoticia.get("/obtenerN", todasLasNoticias)
apiNoticia.get("/obtenerN/:id", noticiaPorId)
apiNoticia.put("/actualizarN/:id", upload.none(), actualizarNoticia)
apiNoticia.delete("/eliminarN/:id", eliminarNoticia)

export default apiNoticia