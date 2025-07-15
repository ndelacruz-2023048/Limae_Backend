import { Router } from "express"
import { validateTokenJWT } from "../../middlewares/validate.jwt.js"
import { getMessage, getUsersConnected, sendMessage } from "./message.controller.js"

const router = Router()

router.get(
    '/users', 
    [
        validateTokenJWT
    ],
    getUsersConnected
)

router.get(
    '/:id',
    [
        validateTokenJWT
    ],
    getMessage
)

router.post(
    '/send/:id',
    [
        validateTokenJWT
    ],
    sendMessage
)

export default router