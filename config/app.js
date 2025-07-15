import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/usuario/usuario.routes.js'
import reportRoutes from '../src/reporte/reporte.routes.js'
import noticiaRoutes from '../src/noticias/noticia.router.js'
import authRoutes from '../src/Auth/auth.routes.js'
import cookieParser from "cookie-parser"
import chatRoutes from '../src/Message/message.routes.js'
import { userSocket } from "../src/Socket/userState.js"

import http from "http"
import {Server as SocketServer} from 'socket.io'
import { setIO } from "../src/Socket/io.js"
import user from "../src/usuario/usuario.routes.js"
import { neMessage } from "../src/Socket/MessageSocket.js"
import formularioRoutes from '../src/formularios/formulario.routes.js'

const configs = (app)=>{
    app.use(express.json())
        app.use(express.urlencoded({extended: false}))
        app.use(cors(
            {
                origin: ['http://localhost:5173','https://limae.org'],
                credentials: true,
            }
        ))
        app.use(helmet())
        app.use(cookieParser())
        app.use(morgan('dev'))
        app.use(limiter)
}

const routes = (app)=>{
    app.use('/SeminarioProyecto/v1/Auth', authRoutes)
    app.use('/SeminarioProyecto/v1/Chat', chatRoutes)
    app.use('/api/v1/usuarios', userRoutes)
    app.use('/api/v1/reportes', reportRoutes)
    app.use("/api/v1/noticias", noticiaRoutes)
    app.get('/', (req, res) => {
        res.status(200).send('La API de LimaeBackend está funcionando correctamente!');
    });
    app.use('/api/v1/formularios', formularioRoutes)
}

const socketConf = (socket, io) => {
    userSocket(socket, io)
    neMessage(socket, io)
}


export const initServer = ()=>{
    const app = express()
    const server = http.createServer(app)
    const io = new SocketServer(server, {
        cors: {
            origin: ['http://localhost:5173','https://main.d20sfomf586tvk.amplifyapp.com'],
            credentials: true
        }
    })
    io.on('connection', (socket) => {
        setIO(io)
        console.log(`Socket connected: ${socket.id}`);
        socketConf(socket, io);
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
    try{
        configs(app)
        routes(app)
        server.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
        
    }catch(e){
        console.error('Server init failed', e)
    }
}
