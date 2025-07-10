import { Router } from "express"
import { validateDataUser } from "../../middlewares/validators.js"
import { register, login } from "./auth.controller.js"

const router = Router()

router.post(
    '/register', [
        validateDataUser
    ], 
    register
)

router.post('/login', login)

export default router