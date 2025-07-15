import { Router } from "express"
import { validateDataUser } from "../../middlewares/validators.js"
import { register, login, logout } from "./auth.controller.js"
import { refreshJwt } from '../../utils/refresh.jwt.js'

const router = Router()

router.post(
    '/register', [
        validateDataUser
    ], 
    register
)

router.post('/login', login)

router.post('/logout', logout)

router.post('/refresh', refreshJwt)

export default router