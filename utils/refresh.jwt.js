import jwt from 'jsonwebtoken';
import { generateJwt } from './jwt.js'; // Ruta según tu estructura

export const refreshJwt = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).send({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);

        console.log('Decoded refresh token:', decoded);
        

        // Generar nuevo access token
        const newAccessToken = generateJwt({
        uid: decoded.uid,
        username: decoded.username,
        role: decoded.role
        });

        console.log('New access token generated:', newAccessToken);

        // Enviar nuevo token como cookie
        return res
        .cookie('token', newAccessToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 // 1 hora
        })
        .status(200)
        .json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).send({ message: 'Invalid or expired refresh token' });
    }
};