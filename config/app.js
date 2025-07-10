import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/usuario/usuario.routes.js'
import reportRoutes from '../src/reporte/reporte.routes.js'
import authRoutes from '../src/Auth/auth.routes.js'
import cookieParser from "cookie-parser"

const configs = (app)=>{
    app.use(express.json())
        app.use(express.urlencoded({extended: false}))
        app.use(cors(
            {
                origin: ['http://localhost:5173','https://main.d20sfomf586tvk.amplifyapp.com'],
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
    app.use('/api/v1/usuarios', userRoutes)
    app.use('/api/v1/reportes', reportRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
        
    }catch(e){
        console.error('Server init failed', e)
    }
}
