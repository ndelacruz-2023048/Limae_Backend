import { Router } from "express";
import { getUsuarios, getUsuariosAdmins } from "./usuario.controller.js";

const user = Router()

user.get('/users', getUsuarios)
user.get('/admin', getUsuariosAdmins)

export default user