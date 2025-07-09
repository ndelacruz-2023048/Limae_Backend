import User from '../usuario/usuario.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js' 
import { generateJwt } from '../../utils/jwt.js'
import { validateTokenJWT } from '../../middlewares/validate.jwt.js'

export const register = async(req, res) => {
    const data = req.body
    try {
        let user = await User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.status(201).send(
            {
                success: true,
                message: `Register successfully, can be login to system with username: ${user.username} or email: ${user.email}`,
            }
        )
    } catch (e) {
        console.error('Error in register:', e);
        return res.status(500).send(
            {
                success: false,
                message: 'Error registering user',
            }
        )
    }
}

export const login = async(req, res) => {
    const { login, password } = req.body
    try {
        const user = await User.findOne(
            {
                $or: [
                    { username: login },
                    { email: login }
                ]
            }
        )

        if(user && await checkPassword(user.password, password)) {
            const loggedUser = {
                uid: user._id,
                username: user.username,
                role: user.role,
                photo: user.profilePicture
            }
            const token = await generateJwt(loggedUser)
            return res
                .cookie('token', token, {
                    httpOnly: false,     // 👈 Evita ataques XSS
                    secure: process.env.NODE_ENV === 'production', // 👈 Solo HTTPS en prod
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 👈 Ajuste según entorno
                    maxAge: 1000 * 60 * 60, // 1 hora
                    domain: process.env.NODE_ENV === 'production' 
                        ? 'amplifyapp.com' // ⚠️ O el dominio compartido entre front y back
                        : undefined
                })
                .status(200)
                .send(
                    {
                        success: true,
                        message: `Login successfully, welcome ${user.username}`,
                    }
                )
        }
    } catch (e) {
        console.error('Error in login:', e);
        return res.status(500).send(
            {
                success: false,
                message: 'Error logging in user',
            }
        )
    }
}

export const logout = [validateTokenJWT, (req, res ) => {
    return res
        .clearCookie('token')
        .status(200)
        .send(
            {
                success: true,
                message: `Logout successfully, see you soon ${req.user.username}`,
            }
        )
}]
