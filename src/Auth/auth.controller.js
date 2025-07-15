import User from '../usuario/usuario.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js' 
import { generateJwt } from '../../utils/jwt.js'
import { validateTokenJWT } from '../../middlewares/validate.jwt.js'
import jwt from 'jsonwebtoken';

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
    const { login, password, rememberMe } = req.body
    try {
        const user = await User.findOne(
            {
                $or: [
                    { username: login },
                    { email: login }
                ]
            }
        )

        console.log('Funciono el rememberMe:', rememberMe); 

        if(user && await checkPassword(user.password, password)) {
            const loggedUser = {
                uid: user._id,
                username: user.username,
                role: user.role,
                photo: user.profilePicture
            }
            const token = await generateJwt(loggedUser)
            const refreshToken = jwt.sign(
                { 
                    uid: user._id,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                    role: user.rol,
                    photo: user.profilePicture
                }, // Puedes incluir más datos si lo necesitas
                process.env.JWT_REFRESH_SECRET, // Debe estar en tu .env
                { expiresIn: rememberMe ? '7d' : '1d' } // Si "rememberMe", dura más
            )

            const oneHour = 1000 * 60 * 60
            const oneWeek = oneHour * 24 * 7
            const cookieExpiration = rememberMe ? oneWeek : oneHour

            return res
                .cookie('token', token, {
                    httpOnly: false,     // 👈 Evita ataques XSS
                    secure: process.env.NODE_ENV === 'production', // 👈 Solo HTTPS en prod
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 👈 Ajuste según entorno
                    maxAge: cookieExpiration,
                    domain: process.env.NODE_ENV === 'production' 
                        ? 'limae.org' // ⚠️ O el dominio compartido entre front y back
                        : undefined
                })
                .cookie('refreshToken', refreshToken, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    maxAge: oneWeek // 1 semana para el refresh token
                })
                .status(200)
                .send(
                    {
                        success: true,
                        message: `Login successfully, welcome ${user.username}`,
                        loggedUser 
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
        .clearCookie('refreshToken')
        .json({
            success: true,
            message: `Logged out successfully, goodbye ${req.user.name}`,
        })
}]
