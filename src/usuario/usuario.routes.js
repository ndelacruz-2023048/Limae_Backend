import { Router } from "express";
import { getUsuarios } from "./usuario.controller.js";

const user = Router()

user.get('/users', getUsuarios)

export default user