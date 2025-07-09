import {Router} from "express";

import { agregarNoticia, eliminarNoticia, todasLasNoticias, noticiaPorId, actualizarNoticia } from "./noticia.controller.js";

const apiNoticia = Router()

apiNoticia.post("/agregarN", agregarNoticia)
apiNoticia.get("/obtenerN", todasLasNoticias)
apiNoticia.get("/obtenerN/:id", noticiaPorId)
apiNoticia.put("/actualizarN/:id", actualizarNoticia)
apiNoticia.delete("/eliminarN/:id", eliminarNoticia)

export default apiNoticia